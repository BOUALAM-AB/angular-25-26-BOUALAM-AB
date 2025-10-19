import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';

import { AssignmentsService } from '../../../service/assignments.service';
import { Assignment } from '../../../model/assignment.model';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule,
    MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './add-assignment.html',
  styleUrls: ['./add-assignment.scss']
})
export class AddAssignment {
  nom = '';
  date: Date | null = null;

  constructor(private svc: AssignmentsService, private router: Router) {}

  get disabled() { return !(this.nom.trim() && this.date); }

  onSubmit() {
    if (this.disabled) return;
    const a: Assignment = {
      
      nom: this.nom.trim(),
      dateDeRendu: this.date!, 
      rendu: false
    }as any;
    this.svc.addAssignment(a).subscribe(() => this.router.navigate(['/home']));
  }
}
