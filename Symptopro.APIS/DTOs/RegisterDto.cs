using System.ComponentModel.DataAnnotations;

namespace Symptopro.APIS.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }



        [Required]
        public string FullName { get; set; }


        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [RegularExpression("(?=^.{6,10}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&amp;*()_+]).*$",
            ErrorMessage = "Password must contains 1 Uppercase, 1 Lowercase, 1Digit, 1 Speacial Character")]
        public string Password { get; set; }
    }
}
