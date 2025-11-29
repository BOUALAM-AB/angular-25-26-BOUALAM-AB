import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Assignment } from '../../model/assignment.model';
import { AssignmentsService } from '../../service/assignments.service';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-liste-devoirs',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './liste-devoirs.component.html',
  styleUrls: ['./liste-devoirs.component.scss'],
})
export class ListeDevoirsComponent implements OnInit {
  constructor(
    private svc: AssignmentsService,
    private cdr: ChangeDetectorRef
  ) {}

  // --- Données en mémoire ---
  private allAssignments: Assignment[] = [];
  private filteredAssignments: Assignment[] = [];
  pageAssignments: Assignment[] = [];

  // --- Filtres ---
  searchTerm = '';
  statusFilter: 'all' | 'rendu' | 'non-rendu' = 'all';

  // --- Pagination ---
  page = 1;
  limit = 10;
  totalDocs = 0;
  totalFiltered = 0;
  totalPages = 0;
  hasPrevPage = false;
  hasNextPage = false;


  isLoading = false;

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll() {
    this.isLoading = true;
    this.cdr.markForCheck(); // on prévient Angular

    // on demande une page 1 très large (10000) pour tout récupérer
    this.svc.getAssignmentsPage(1, 10000).subscribe({
      next: (meta: any) => {
        const list = Array.isArray(meta?.docs)
          ? meta.docs
          : Array.isArray(meta)
            ? meta
            : [];

        this.allAssignments = list;
        this.totalDocs = meta?.totalDocs ?? list.length;

        this.page = 1;
        this.applyFiltersAndPagination();
        this.isLoading = false;


        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(' Erreur lors du chargement des assignments', err);
        this.allAssignments = [];
        this.totalDocs = 0;
        this.totalFiltered = 0;
        this.pageAssignments = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private applyFiltersAndPagination() {
    let res = [...this.allAssignments];

    // 1) Recherche
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      res = res.filter(a => a.nom?.toLowerCase().includes(term));
    }

    // 2) Filtre état
    if (this.statusFilter === 'rendu') {
      res = res.filter(a => a.rendu);
    } else if (this.statusFilter === 'non-rendu') {
      res = res.filter(a => !a.rendu);
    }

    this.filteredAssignments = res;
    this.totalFiltered = res.length;

    this.totalPages = Math.max(1, Math.ceil(this.totalFiltered / this.limit));
    if (this.page > this.totalPages) {
      this.page = this.totalPages;
    }

    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;
    this.pageAssignments = res.slice(start, end);

    this.hasPrevPage = this.page > 1;
    this.hasNextPage = this.page < this.totalPages;
  }

  onFiltersChanged() {
    this.page = 1;
    this.applyFiltersAndPagination();
    this.cdr.detectChanges();
  }

  first() {
    if (this.page !== 1) {
      this.page = 1;
      this.applyFiltersAndPagination();
      this.cdr.detectChanges();
    }
  }

  prev() {
    if (this.hasPrevPage) {
      this.page--;
      this.applyFiltersAndPagination();
      this.cdr.detectChanges();
    }
  }

  next() {
    if (this.hasNextPage) {
      this.page++;
      this.applyFiltersAndPagination();
      this.cdr.detectChanges();
    }
  }

  last() {
    if (this.page !== this.totalPages) {
      this.page = this.totalPages;
      this.applyFiltersAndPagination();
      this.cdr.detectChanges();
    }
  }

  seed() {
    this.isLoading = true;
    this.cdr.markForCheck();

    this.svc.peuplerBDAvecForkJoin().subscribe(() => {
      this.fetchAll();
    });
  }

  trackById = (_: number, a: Assignment) => a.id;
}
