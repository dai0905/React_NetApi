using System.ComponentModel.DataAnnotations;

namespace WebAPI_StudentList.Models
{
    public class StudentModel
    {
        [Required]
        public string? MaSinhVien { get; set; }

        [Required]
        [MaxLength(50)]
        public string? TenSinhVien { get; set; }
        public DateOnly NgaySinh { get; set; }
        public string? GioiTinh { get; set; }

        [Required]
        public string? MaKhoa { get; set; }
    }
}
