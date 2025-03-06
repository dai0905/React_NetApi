using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI_StudentList.Data;

namespace WebAPI_StudentList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacultyController : ControllerBase
    {
        private readonly StudentListContext db;

        public FacultyController(StudentListContext context) {
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Faculty>>> getFaculy()
        {
            try
            {
                return Ok(await db.Faculties.ToListAsync());
            } catch (Exception ex)
            {
                return BadRequest($"Lỗi khi lấy danh sách khoa : {ex.Message}");
            }
        }
    }
}
