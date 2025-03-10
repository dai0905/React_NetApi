using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Helpers;
using WebAPI_StudentList.Data;
using WebAPI_StudentList.Models;

namespace WebAPI_StudentList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentListContext db;
        private readonly IMapper _mapper;

        public StudentController(StudentListContext _context, IMapper mapper)
        {
            db = _context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<StudentModel>>> getAllStudent(string? keyword, int page=1, int pageSize=7)
        {
            try
            {
                var query = db.Students.AsQueryable();
                if (!string.IsNullOrWhiteSpace(keyword))
                {
                    query = query.Where(s => s.MaSinhVien!.Contains(keyword) || s.TenSinhVien!.Contains(keyword)
                    || s.MaKhoaNavigation!.TenKhoa!.Contains(keyword));
                }

                var totalStudent = await query.CountAsync();
                var students = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
                var studentModel = _mapper.Map<List<StudentModel>>(students);
                return Ok(new
                {
                    students = studentModel,
                    totalPage = (int)Math.Ceiling(totalStudent / (double)pageSize)
                });
            }
            catch (Exception ex) 
            {
                return BadRequest($"Lỗi khi lấy danh sách Student : {ex.Message}");
            }
        }

        [Authorize(Roles = AppRole.Admin)]
        [HttpPost]
        public async Task<ActionResult> CreateStudent(StudentModel model)
        {
            try
            {
                var student = _mapper.Map<Student>(model);
                db.Students.Add(student);
                return Ok( await db.SaveChangesAsync());
            }
            catch (Exception ex) 
            {
                return BadRequest($"Lỗi khi thêm mới student : {ex.Message}");
            }
        }

        [Authorize(Roles = AppRole.Admin)]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateStudent(string id, StudentModel model)
        {
            if (id == model.MaSinhVien)
            {
                var student = _mapper.Map<Student>(model);
                db.Students.Update(student);
                await db.SaveChangesAsync();
                return Ok();
            }
            
            return BadRequest("Lỗi không cập nhật được sinh viên !");
        }

        [Authorize(Roles = AppRole.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStudent(string id)
        {
            var sv = await db.Students.FindAsync(id);
            if (sv != null)
            {
                db.Students.Remove(sv);
                await db.SaveChangesAsync();
                return Ok();
            }

            return BadRequest("Không xóa được sinh viên !");
        }
    }
}
