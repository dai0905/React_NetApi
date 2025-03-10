using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI_StudentList.Data
{
    [Table("Student")]
    public class Student
    {
        [Key]
        public string? MaSinhVien { get; set; }

        [Required]
        [MaxLength(50)]
        public string? TenSinhVien { get; set;}
        public DateOnly NgaySinh { get; set;}
        public string? GioiTinh { get; set;}

        [Required]
        public string? MaKhoa { get; set;}
        public virtual Faculty? MaKhoaNavigation { get; set;}

        public string? UserId { get; set; }
        public virtual ApplicationUser? UserIdNavigation { get; set; }
    }
}
