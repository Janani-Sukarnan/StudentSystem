import { Component, OnInit, inject } from '@angular/core';
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

  students: Student[] = [];

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response) => {
        this.students = response;
        console.log('Students loaded successfully:', response);
        console.log('Student count:', this.students.length);
        console.log('Students in component:', this.students);
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }
}