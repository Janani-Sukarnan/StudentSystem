import { Component, OnInit, inject,signal } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-list',
  imports: [],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {

  private studentService = inject(StudentService);

  students = signal<Student[]>([]);

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response) => {
        this.students.set(response);
        console.log('Students loaded successfully:', response);
        console.log('Student count:', this.students().length);
        console.log('Students in component:', this.students);
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

deleteStudent(id: number): void {

  const confirmed = confirm('Are you sure you want to delete this student?');

  if (!confirmed) {
    return;
  }

  this.studentService.deleteStudent(id).subscribe({

    next: (response) => {
      console.log('Student deleted successfully:', response);

      alert('Student deleted successfully!');

      this.loadStudents();
    },

    error: (error) => {
      console.error('Error deleting student:', error);
      alert('Unable to delete student. Please try again.');
    }

  });
}

}