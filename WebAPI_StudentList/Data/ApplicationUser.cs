using Microsoft.AspNetCore.Identity;

namespace WebAPI_StudentList.Data
{
    public class ApplicationUser : IdentityUser
    {
        public virtual Student? Student { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
