
using Microsoft.AspNetCore.Mvc;
using Student_Management_System.DTOs.Student;
using Student_Management_System.Services.Interfaces;

namespace Student_Management_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpPost]
        public IActionResult CreateStudent([FromBody] StudentCreateDto student)
        {
            var response = _studentService.CreateStudent(student);

            return Ok(response);
        }
        [HttpGet]
        public IActionResult GetAllStudents()
        {
            var response = _studentService.GetAllStudents();

            return Ok(response);
        }
        [HttpGet("{id}")]
        public IActionResult GetStudentById(int id)
        {
            var response = _studentService.GetStudentById(id);

            if (response == null)
            {
                return NotFound(new
                {
                    message = "Student not found."
                });
            }

            return Ok(response);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateStudent(int id, [FromBody] StudentUpdateDto studentDto)
        {
            var isUpdated = _studentService.UpdateStudent(id, studentDto);

            if (!isUpdated)
            {
                return NotFound(new
                {
                    message = "Student not found."
                });
            }

            return Ok(new
            {
                message = "Student updated successfully."
            });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(int id)
        {
            var isDeleted = _studentService.DeleteStudent(id);

            if (!isDeleted)
            {
                return NotFound(new
                {
                    message = "Student not found."
                });
            }

            return Ok(new
            {
                message = "Student deleted successfully."
            });
        }


    }
}
