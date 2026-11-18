
using Student_Management_System.Models;

namespace Student_Management_System.Repositories.Interfaces
{
    public interface IStudentRepository
    {
        Student AddStudent(Student student);
        List<Student> GetAllStudents();
        Student? GetStudentById(int id);
        void UpdateStudent(Student student);
    }
}
