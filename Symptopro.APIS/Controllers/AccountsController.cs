using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Symptopro.APIS.DTOs;
using Symptopro.APIS.Errors;
using Symptopro.Core.Entities;
using Symptopro.Core.Entities.Identity;
using Symptopro.Core.Services;
using Symptopro.Service;
using System.Security.Claims;

namespace Symptopro.APIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : APIBaseController
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IEmailService _emailService;

        public AccountsController(
            SignInManager<ApplicationUser> signInManager, 
            UserManager<ApplicationUser> userManager, 
            ITokenService tokenService,
            IEmailService emailService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _emailService = emailService;
        }


        #region Register
        [HttpPost("Register")]
        public async Task<ActionResult<RegisterDto>> Register([FromBody] RegisterDto registerDto)
        {
            if (CheckEmailExists(registerDto.Email).Result.Value)
            {
                return BadRequest(new ApiResponse(400, "Email is Already Exist"));
            }
            var user = new ApplicationUser
            {
                Email = registerDto.Email,
                FullName = registerDto.FullName,
                UserName = registerDto.Email.Split('@')[0],
                DateOfBirth = registerDto.DateOfBirth,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
                return BadRequest(new ApiResponse(400));
            // Generate verification code
            var verificationCode = new Random().Next(100000, 999999).ToString();

            // Store the code in user's claims (or database if needed)
            var claim = new Claim("VerificationCode", verificationCode);
            await _userManager.AddClaimAsync(user, claim);

            // Send email with the verification code
            var email = new Email
            {
                Subject = "Verification Code",
                To = registerDto.Email,
                Body = $"<h3>Your verification code is: {verificationCode}</h3>"
            };

            await _emailService.SendEmailAsync(email);

            return Ok(new ApiResponse(200, "Registration successful! Verification code sent."));
        }

        [HttpPost("EmailConfirmation")]
        public async Task<ActionResult> VerifyCode([FromBody] EmailConfirmationDto emailConfirmation)
        {
            var user = await _userManager.FindByEmailAsync(emailConfirmation.Email);
            if (user == null) return NotFound(new ApiResponse(404, "User not found"));

            var claims = await _userManager.GetClaimsAsync(user);
            var codeClaim = claims.FirstOrDefault(c => c.Type == "VerificationCode");

            if (codeClaim == null || codeClaim.Value != emailConfirmation.VerificationCode)
                return BadRequest(new ApiResponse(400, "Invalid verification code"));

            // Mark user as verified (e.g., add a claim or update a property)
            await _userManager.RemoveClaimAsync(user, codeClaim);
            await _userManager.AddClaimAsync(user, new Claim("IsVerified", "True"));
            user.EmailConfirmed = true;
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(new ApiResponse(400, "Failed to confirm email"));

            return Ok(new ApiResponse(200, "Email verified successfully!"));
        }
        #endregion

        #region Login
        // Login
        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login( [FromBody] LoginDto model)
        {
            var User = await _userManager.FindByEmailAsync(model.Email);
            if (User == null)
                return Unauthorized(new ApiResponse(401));
            var Result = await _signInManager.CheckPasswordSignInAsync(User, model.Password, false);
            if (!Result.Succeeded)
                return Unauthorized(new ApiResponse(401));

            return Ok(new UserDto
            {
                FullName = User.FullName,
                Email = User.Email!,
                Token = await _tokenService.CreateTokenAsync(User, _userManager)
            });
        } 
        #endregion




        private async Task<ActionResult<bool>> CheckEmailExists(string email)
        {
            return await _userManager.FindByEmailAsync(email) is not null;
        }
    }
}
