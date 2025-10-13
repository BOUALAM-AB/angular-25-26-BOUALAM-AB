import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Assignment } from '../../model/assignment.model';
import { AssignmentsService } from '../../service/assignments.service';

@Component({
  selector: 'app-liste-devoirs',
  standalone: true,
  imports: [
    CommonModule, DatePipe,
    MatCardModule, MatListModule, MatDividerModule, MatButtonModule, MatIconModule,
    RouterLink, RouterLinkActive
  ],
  templateUrl: './liste-devoirs.component.html',
  styleUrls: ['./liste-devoirs.component.scss']
})
export class ListeDevoirsComponent implements OnInit {
  assignments: Assignment[] = [];

  constructor(private svc: AssignmentsService) {}

  ngOnInit(): void {
    this.svc.getAssignments().subscribe(list => this.assignments = list);
  }
}
