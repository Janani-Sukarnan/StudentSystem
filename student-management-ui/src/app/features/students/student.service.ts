
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7235/api/Student';

  createStudent(student: Student): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }
  getAllStudents(): Observable<Student[]> {
  return this.http.get<Student[]>(this.apiUrl);
  
}
getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
}
}
