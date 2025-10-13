import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../../../service/assignments.service';
import { AuthService } from '../../../service/auth.service';       // ⬅️ NEW
import type { Assignment } from '../../../model/assignment.model';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, MatCardModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './assignment-detail.html'
})
export class AssignmentDetail {
  assignment: Assignment | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: AssignmentsService,
    public auth: AuthService                                 
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    this.svc.getAssignment(id).subscribe(a => (this.assignment = a));
  }

  goEdit() {
    if (!this.assignment) return;
    this.router.navigate(['/assignment', this.assignment.id, 'edit']);
  }

  markRendu() {
    if (!this.assignment) return;
    const updated = { ...this.assignment, rendu: true };
    this.svc.updateAssignment(updated).subscribe(() => this.router.navigate(['/home']));
  }

  onDelete() {
    if (!this.assignment) return;
    this.svc.deleteAssignment(this.assignment).subscribe(() => this.router.navigate(['/home']));
  }
}
