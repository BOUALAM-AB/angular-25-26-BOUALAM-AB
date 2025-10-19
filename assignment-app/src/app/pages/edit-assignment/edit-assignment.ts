// edit-assignment.component.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,  // perf
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './edit-assignment.html',
  styleUrls: ['./edit-assignment.scss']
})
export class EditAssignmentComponent {
  assignment?: Assignment;
  dateInput = '';

  constructor(
    private route: ActivatedRoute,
    private svc: AssignmentsService,
    public router: Router
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const fromState = nav?.extras?.state as { prefetched?: Assignment } | undefined;
    if (fromState?.prefetched) {
      this.setModel(fromState.prefetched);     // instantané
      this.svc.prefetch(fromState.prefetched.id!); // refresh
      return;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const cached = this.svc.getFromStore(id);
    if (cached) {
      this.setModel(cached);
      this.svc.prefetch(id);
    } else {
      this.svc.getAssignment(id).subscribe(a => this.setModel(a));
    }
  }

  private setModel(a: Assignment) {
    this.assignment = a;
    const dt = new Date(a.dateDeRendu);
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const d = String(dt.getDate()).padStart(2, '0');
    this.dateInput = `${dt.getFullYear()}-${m}-${d}`;
  }

  onCancel() {
    if (!this.assignment) { this.router.navigate(['/home']); return; }
    this.router.navigate(['/assignment', this.assignment.id]);
  }

  onSave() {
    if (!this.assignment) return;
    this.assignment.dateDeRendu = new Date(this.dateInput);
    this.svc.updateAssignment(this.assignment).subscribe(() => this.router.navigate(['/home']));
  }
}
