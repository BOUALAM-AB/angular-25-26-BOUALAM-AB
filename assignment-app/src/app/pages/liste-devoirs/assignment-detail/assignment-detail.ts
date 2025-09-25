import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import type { Assignment } from '../liste-devoirs.component';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, MatCardModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './assignment-detail.html'
})
export class AssignmentDetail {
  @Input({ required: true }) assignment!: Assignment;
  @Output() rendu = new EventEmitter<Assignment>();
  @Output() deleteRequest = new EventEmitter<Assignment>();

  markRendu() { this.rendu.emit(this.assignment); }
}
