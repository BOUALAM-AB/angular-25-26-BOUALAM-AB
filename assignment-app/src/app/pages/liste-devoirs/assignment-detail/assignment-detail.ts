
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../../../service/assignments.service';
import { AuthService } from '../../../service/auth.service';
import type { Assignment } from '../../../model/assignment.model';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './assignment-detail.html',
  styleUrls: ['./assignment-detail.scss']
})
export class AssignmentDetail {
  assignment?: Assignment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private svc: AssignmentsService,
    public auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const fromState = nav?.extras?.state as { prefetched?: Assignment } | undefined;

    if (fromState?.prefetched) {
      this.assignment = fromState.prefetched;
      this.svc.prefetch(this.assignment.id!);
      return;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const cached = this.svc.getFromStore(id);

    if (cached) {
      this.assignment = cached;
      this.svc.prefetch(id);
    } else {
      this.svc.getAssignment(id).subscribe(a => this.assignment = a);
    }
  }

  goEdit() {
    if (!this.assignment) return;
    this.router.navigateByUrl(`/assignment/${this.assignment.id}/edit`, {
      state: { prefetched: this.assignment }
    });
  }


  markRendu() {
    if (!this.assignment) return;

    const updated = { ...this.assignment, rendu: true };

    this.svc.updateAssignment(updated).subscribe(() => {
      this.assignment = updated;


      this.snackBar.open('Assignment marqué comme rendu ✅', 'OK', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });


      this.router.navigate(['/home']);
    });
  }

  onDelete() {
    if (!this.assignment) return;
    this.svc.deleteAssignmentById(this.assignment.id!).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
