using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebAPI_StudentList.Data
{
    public class StudentListContext : IdentityDbContext<ApplicationUser>
    {
        public StudentListContext(DbContextOptions<StudentListContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Faculty> Faculties { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Cấu hình Student - Faculty (1 Faculty có nhiều Student)
            builder.Entity<Student>()
                .HasOne(s => s.MaKhoaNavigation)
                .WithMany(f => f.Students)
                .HasForeignKey(s => s.MaKhoa)
                .OnDelete(DeleteBehavior.Restrict);

            // Cấu hình Student - ApplicationUser (1 Student có 1 tài khoản)
            builder.Entity<Student>()
                .HasOne(s => s.UserIdNavigation)
                .WithOne(u => u.Student)
                .HasForeignKey<Student>(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
