import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../../service/assignments.service';
import { Assignment } from '../../model/assignment.model';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule
  ],
  templateUrl: './edit-assignment.html',   
  styleUrls: ['./edit-assignment.scss']   
})
export class EditAssignmentComponent {
  assignment: Assignment | undefined;

  constructor(
    private route: ActivatedRoute,
    private svc: AssignmentsService,
    public router: Router         
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    this.svc.getAssignment(id).subscribe(a => this.assignment = a);
  }

  toInputDate(d: Date | string) {
    const dt = new Date(d);
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    return `${dt.getFullYear()}-${m}-${day}`;
  }

  onDateChange(v: string) {
    if (this.assignment) this.assignment.dateDeRendu = new Date(v);
  }

  onCancel() {                      // ⬅️ plus propre que d’appeler router.navigate dans le HTML
    if (!this.assignment) { this.router.navigate(['/home']); return; }
    this.router.navigate(['/assignment', this.assignment.id]);
  }

  onSave() {
    if (!this.assignment) return;
    this.svc.updateAssignment(this.assignment).subscribe(() => this.router.navigate(['/home']));
  }
}
