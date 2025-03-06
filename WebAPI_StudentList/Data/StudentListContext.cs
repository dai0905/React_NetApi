using Microsoft.EntityFrameworkCore;

namespace WebAPI_StudentList.Data
{
    public class StudentListContext : DbContext
    {
        public StudentListContext(DbContextOptions<StudentListContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Faculty> Faculties { get; set; }
    }
}
