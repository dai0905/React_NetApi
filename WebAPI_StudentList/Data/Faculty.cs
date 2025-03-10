using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI_StudentList.Data
{
    [Table("Faculty")]
    public class Faculty
    {
        [Key]
        public string? MaKhoa { get; set; }

        [Required]
        [MaxLength(50)]
        public string? TenKhoa { get; set; }

        public virtual ICollection<Student> Students { get; set; } = new List<Student>();
    }
}
