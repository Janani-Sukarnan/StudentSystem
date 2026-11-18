
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
@Component({
  selector: 'app-student-create',
  imports: [ReactiveFormsModule],
  templateUrl: './student-create.html',
  styleUrl: './student-create.css',
})
export class StudentCreate {

  private fb = inject(FormBuilder).nonNullable;
  private studentService = inject(StudentService);

successMessage = '';
errorMessage = '';

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

  
onSubmit() {

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
  this.studentService.createStudent(student).subscribe({

    next: (response) => {
      console.log('Student registered successfully:', response);

      this.successMessage = 'Student registered successfully!';
      this.errorMessage = '';

      this.studentForm.reset({
        StudentName: '',
        Gender: '',
        Email: '',
        PhoneNumber: '',
        DepartmentId: 1
      });
    },

    error: (error) => {
      console.error('Error registering student:', error);

      this.successMessage = '';
      this.errorMessage = 'Unable to register student. Please try again.';
    }

  });
}
}
