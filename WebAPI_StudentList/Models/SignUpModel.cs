using System.ComponentModel.DataAnnotations;

namespace WebAPI_StudentList.Models
{
    public class SignUpModel
    {
        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        [Required]
        public string ConfirmPassword { get; set; } = null!;
    }
}
