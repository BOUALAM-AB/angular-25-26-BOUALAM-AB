// liste-devoirs.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, AsyncPipe } from '@angular/common';
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
    CommonModule, DatePipe, AsyncPipe,
    MatCardModule, MatListModule, MatDividerModule, MatButtonModule, MatIconModule,
    RouterLink, RouterLinkActive
  ],
  templateUrl: './liste-devoirs.component.html',
  styleUrls: ['./liste-devoirs.component.scss']
})
export class ListeDevoirsComponent implements OnInit {
  constructor(public svc: AssignmentsService) {}

  get vm$() { return this.svc.assignments$; }

  page = 1;
  limit = 10;
  totalDocs = 0;
  totalPages = 0;
  hasPrevPage = false;
  hasNextPage = false;
  prevPage: number | null = null;
  nextPage: number | null = null;

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(p: number) {
    this.svc.getAssignmentsPage(p, this.limit).subscribe(meta => {
      this.page        = meta.page;
      this.limit       = meta.limit;
      this.totalDocs   = meta.totalDocs;
      this.totalPages  = meta.totalPages;
      this.hasPrevPage = meta.hasPrevPage;
      this.hasNextPage = meta.hasNextPage;
      this.prevPage    = meta.prevPage;
      this.nextPage    = meta.nextPage;
    });
  }

  first()  { if (this.page !== 1) this.loadPage(1); }
  prev()   { if (this.hasPrevPage && this.prevPage) this.loadPage(this.prevPage); }
  next()   { if (this.hasNextPage && this.nextPage) this.loadPage(this.nextPage); }
  last()   { if (this.page !== this.totalPages) this.loadPage(this.totalPages); }

  seed() {
  this.svc.peuplerBDAvecForkJoin().subscribe(() => {
    
    this.svc.loadAll();
  });
}

  trackById = (_: number, a: Assignment) => a.id;
}

