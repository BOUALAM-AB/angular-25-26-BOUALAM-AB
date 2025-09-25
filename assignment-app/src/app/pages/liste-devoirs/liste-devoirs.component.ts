import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

import { AssignmentDetail } from './assignment-detail/assignment-detail';
import { AddAssignment } from './add-assignment/add-assignment';

export type Assignment = { id: number; nom: string; dateDeRendu: string; rendu: boolean; };

@Component({
  selector: 'app-liste-devoirs',
  standalone: true,
  imports: [
    CommonModule, DatePipe,
    MatCardModule, MatListModule, MatDividerModule, MatButtonModule,
    AssignmentDetail, AddAssignment
  ],
  templateUrl: './liste-devoirs.component.html',
  styleUrl: './liste-devoirs.component.scss'
})
export class ListeDevoirsComponent {
  // Données de départ
  assignments: Assignment[] = [
    { id: 1, nom: 'Devoir Angular', dateDeRendu: '2025-09-30', rendu: true  },
    { id: 2, nom: 'Devoir Math',    dateDeRendu: '2025-10-05', rendu: false },
  ];

  // état UI (slides 105–107) : alterner liste/détail vs formulaire
  formVisible = false;

  // sélection pour le détail (slides 88–94)
  assignmentSelectionne: Assignment | null = null;

  // clic sur un item de la liste (slide 90)
  assignmentClique(a: Assignment) {
    this.assignmentSelectionne = a;
  }

  // bouton “Ajouter Assignment” (slide 105–107)
  onAddAssignmentBtnClick() {
    this.formVisible = true;
    this.assignmentSelectionne = null;
  }

  // réception de l’event du formulaire enfant (slides 108–109)
  onAssignmentCreated(e: { nom: string; dateDeRendu: string }) {
    const nextId = this.assignments.length ? Math.max(...this.assignments.map(x => x.id)) + 1 : 1;
    this.assignments = [{ id: nextId, nom: e.nom.trim(), dateDeRendu: e.dateDeRendu, rendu: false }, ...this.assignments];
    this.formVisible = false; // on revient à la liste (slide 108–110)
  }

  // checkbox “rendu” côté détail (slides 97–98)
  onAssignmentRendu(a: Assignment) {
    this.assignments = this.assignments.map(x => x.id === a.id ? { ...x, rendu: true } : x);
    this.assignmentSelectionne = this.assignments.find(x => x.id === a.id)!;
  }

  // suppression demandée par le détail (exercice slide 113)
  onDelete(a: Assignment) {
    this.assignments = this.assignments.filter(x => x.id !== a.id);
    if (this.assignmentSelectionne?.id === a.id) this.assignmentSelectionne = null;
  }
}
