import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Assignment } from '../../model/assignment.model';
import { AssignmentsService } from '../../service/assignments.service';
import { AssignmentDetail } from './assignment-detail/assignment-detail';
import { AddAssignment } from './add-assignment/add-assignment';

@Component({
  selector: 'app-liste-devoirs',
  standalone: true,
  imports: [
    CommonModule, DatePipe,
    MatCardModule, MatListModule, MatDividerModule, MatButtonModule, MatIconModule,
    AssignmentDetail, AddAssignment
  ],
  templateUrl: './liste-devoirs.component.html',
  styleUrl: './liste-devoirs.component.scss'
})
export class ListeDevoirsComponent implements OnInit {
  assignments: Assignment[] = [];
  formVisible = false;
  assignmentSelectionne: Assignment | null = null;

  constructor(private svc: AssignmentsService) {}

  ngOnInit(): void {
    this.reload();
  }

  private reload() {
    this.svc.getAssignments().subscribe(list => this.assignments = list);
  }

  assignmentClique(a: Assignment) {
    this.assignmentSelectionne = a;
  }

  
  isSelected(a: Assignment) {
    return this.assignmentSelectionne?.id === a.id;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
    this.assignmentSelectionne = null;
  }

  onAssignmentCreated(e: { nom: string; dateDeRendu: string }) {
    const a: Assignment = {
      id: 0,
      nom: e.nom.trim(),
      dateDeRendu: new Date(e.dateDeRendu),
      rendu: false
    };
    this.svc.addAssignment(a).subscribe(() => {
      this.formVisible = false;
      this.reload();
    });
  }

  onAssignmentRendu(a: Assignment) {
    const updated: Assignment = { ...a, rendu: true };
    this.svc.updateAssignment(updated).subscribe(() => {
      this.assignmentSelectionne = updated;
      this.reload();
    });
  }

  onDelete(a: Assignment) {
    this.svc.deleteAssignment(a).subscribe(() => {
      if (this.assignmentSelectionne?.id === a.id) this.assignmentSelectionne = null;
      this.reload();
    });
  }
}
