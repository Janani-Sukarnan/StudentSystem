
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-update',
  imports: [ReactiveFormsModule],
  templateUrl: './student-update.html',
  styleUrl: './student-update.css',
})
export class StudentUpdate implements OnInit {

  private fb = inject(FormBuilder).nonNullable;
  private studentService = inject(StudentService);
  private route = inject(ActivatedRoute);

  studentId = 0;

  isLoading = signal(true);
  successMessage = signal('');
  errorMessage = signal('');

  studentForm = this.fb.group({
    StudentName: ['', [
      Validators.required,
      Validators.maxLength(100)
    ]],

    Gender: ['', [
      Validators.required,
      Validators.maxLength(20)
    ]],

    Email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(254)
    ]],

    PhoneNumber: ['', [
      Validators.required,
      Validators.pattern(/^[0-9]{10,15}$/)
    ]],

    DepartmentId: [1, [
      Validators.required,
      Validators.min(1)
    ]]
  });

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(this.studentId) || this.studentId <= 0) {
      this.isLoading.set(false);
      this.errorMessage.set('Invalid student ID.');
      return;
    }

    this.studentService.getStudentById(this.studentId).subscribe({

      next: (student) => {
        this.studentForm.patchValue({
          StudentName: student.studentName,
          Gender: student.gender,
          Email: student.email,
          PhoneNumber: student.phoneNumber,
          DepartmentId: student.departmentId
        });

        this.isLoading.set(false);
      },

      error: (error) => {
        console.error('Error loading student:', error);
        this.errorMessage.set('Unable to load student details.');
        this.isLoading.set(false);
      }

    });
  }

  onSubmit(): void {

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formValue = this.studentForm.getRawValue();

    const student: Student = {
      studentName: formValue.StudentName,
      gender: formValue.Gender,
      email: formValue.Email,
      phoneNumber: formValue.PhoneNumber,
      departmentId: formValue.DepartmentId
    };

    this.studentService.updateStudent(this.studentId, student).subscribe({

      next: (response) => {
        console.log('Student updated successfully:', response);

        this.successMessage.set('Student updated successfully!');
        this.errorMessage.set('');
      },

      error: (error) => {
        console.error('Error updating student:', error);

        this.successMessage.set('');
        this.errorMessage.set('Unable to update student. Please try again.');
      }

    });
  }
}
