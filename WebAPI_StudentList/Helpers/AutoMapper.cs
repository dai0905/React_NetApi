using AutoMapper;
using WebAPI_StudentList.Data;
using WebAPI_StudentList.Models;

namespace WebAPI_StudentList.Helpers
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<StudentModel, Student>().ReverseMap();
        }
    }
}
