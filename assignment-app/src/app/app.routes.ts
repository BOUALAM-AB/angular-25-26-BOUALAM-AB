import { Routes } from '@angular/router';

import { ListeDevoirsComponent } from './pages/liste-devoirs/liste-devoirs.component';
import { AddAssignment } from './pages/liste-devoirs/add-assignment/add-assignment';
import { AssignmentDetail } from './pages/liste-devoirs/assignment-detail/assignment-detail';
import { EditAssignmentComponent } from './pages/edit-assignment/edit-assignment';
import { authGuard } from './service/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: ListeDevoirsComponent },
  { path: 'add', component: AddAssignment },

  { path: 'assignment/:id', component: AssignmentDetail },
  { path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'home' }
];
