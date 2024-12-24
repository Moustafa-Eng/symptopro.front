using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Symptopro.APIS.DTOs;
using Symptopro.APIS.Errors;
using Symptopro.Service;
using System.Security.Claims;

namespace Symptopro.APIS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PredictionsController : APIBaseController
    {
        private readonly IPredictionService _predictionService;

        public PredictionsController(IPredictionService predictionService)
        {
            _predictionService = predictionService;
        }

        [HttpPost("Predict")]
        public async Task<IActionResult> Predict([FromBody] SymptomDto symptomDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400));


            var userId = User.Claims.FirstOrDefault(c => c.Type == "iss")?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var predictionResult = await _predictionService.GetPredictionAndSave(symptomDto, userId);

            if (predictionResult == null)
                return BadRequest(new ApiResponse(500, "Failed to get prediction from the model."));

            return Ok(predictionResult);
        }
    }
}
