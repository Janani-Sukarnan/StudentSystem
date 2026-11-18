import { Routes } from '@angular/router';
import { StudentCreate } from './features/students/student-create/student-create';
import { StudentList } from './features/students/student-list/student-list';
import { StudentDetails } from './features/students/student-details/student-details';
export const routes: Routes = [
  {
    path: 'students/create',
    component: StudentCreate
  },
  {
  path: 'students/:id',
  component: StudentDetails
},
  {
    path: 'students',
    component: StudentList
  },
  {
    path: '',
    redirectTo: 'students/create',
    pathMatch: 'full'
  }
];