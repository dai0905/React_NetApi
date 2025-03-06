using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI_StudentList.Migrations
{
    /// <inheritdoc />
    public partial class DbInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Faculties_MaKhoa",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Students",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Faculties",
                table: "Faculties");

            migrationBuilder.RenameTable(
                name: "Students",
                newName: "Student");

            migrationBuilder.RenameTable(
                name: "Faculties",
                newName: "Faculty");

            migrationBuilder.RenameIndex(
                name: "IX_Students_MaKhoa",
                table: "Student",
                newName: "IX_Student_MaKhoa");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Student",
                table: "Student",
                column: "MaSinhVien");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Faculty",
                table: "Faculty",
                column: "MaKhoa");

            migrationBuilder.AddForeignKey(
                name: "FK_Student_Faculty_MaKhoa",
                table: "Student",
                column: "MaKhoa",
                principalTable: "Faculty",
                principalColumn: "MaKhoa");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Student_Faculty_MaKhoa",
                table: "Student");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Student",
                table: "Student");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Faculty",
                table: "Faculty");

            migrationBuilder.RenameTable(
                name: "Student",
                newName: "Students");

            migrationBuilder.RenameTable(
                name: "Faculty",
                newName: "Faculties");

            migrationBuilder.RenameIndex(
                name: "IX_Student_MaKhoa",
                table: "Students",
                newName: "IX_Students_MaKhoa");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Students",
                table: "Students",
                column: "MaSinhVien");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Faculties",
                table: "Faculties",
                column: "MaKhoa");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Faculties_MaKhoa",
                table: "Students",
                column: "MaKhoa",
                principalTable: "Faculties",
                principalColumn: "MaKhoa");
        }
    }
}
