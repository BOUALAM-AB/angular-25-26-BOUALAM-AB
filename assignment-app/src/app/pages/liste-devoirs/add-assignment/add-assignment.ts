import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';   // ✅ important

import { Router } from '@angular/router';
import { AssignmentsService } from '../../../service/assignments.service';
import { Assignment } from '../../../model/assignment.model';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './add-assignment.html',
  styleUrls: ['./add-assignment.scss'],
})
export class AddAssignment {
  nom = '';
  date?: Date;
  disabled = false;

  constructor(
    private svc: AssignmentsService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.nom || !this.date) return;

    this.disabled = true;

    const a = new Assignment();
    a.nom = this.nom;
    a.dateDeRendu = this.date;
    a.rendu = false;

    this.svc.addAssignment(a).subscribe(() => {
      this.disabled = false;
      this.router.navigate(['/home']);
    });
  }
}
