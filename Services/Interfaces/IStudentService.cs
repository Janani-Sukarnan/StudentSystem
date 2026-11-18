
using Student_Management_System.DTOs.Student;

namespace Student_Management_System.Services.Interfaces
{
    public interface IStudentService
    {
        StudentResponseDto CreateStudent(StudentCreateDto student);
        List<StudentResponseDto> GetAllStudents();
        StudentResponseDto? GetStudentById(int id);
        bool UpdateStudent(int id, StudentUpdateDto studentDto);
        bool DeleteStudent(int id);
    }
}
