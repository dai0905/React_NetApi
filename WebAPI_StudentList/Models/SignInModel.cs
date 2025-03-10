using System.ComponentModel.DataAnnotations;

namespace WebAPI_StudentList.Models
{
    public class SignInModel
    {
        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
