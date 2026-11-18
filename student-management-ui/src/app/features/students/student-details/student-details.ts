import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-details',
  imports: [],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private studentService = inject(StudentService);

  student: Student | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getStudentById(id).subscribe({
      next: (response) => {
        this.student = response;
        console.log('Student details loaded:', response);
      },
      error: (error) => {
        console.error('Error loading student details:', error);
      }
    });
  }
}