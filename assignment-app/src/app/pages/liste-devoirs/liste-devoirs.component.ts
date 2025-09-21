import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Rendu } from '../../shared/rendu';


type Assignment = { id: number; nom: string; dateDeRendu: string; rendu: boolean; };

@Component({
  selector: 'app-liste-devoirs',
  imports: [CommonModule, MatCardModule, MatButtonModule, Rendu],
  templateUrl: './liste-devoirs.component.html',
  styleUrl: './liste-devoirs.component.scss'
})


export class ListeDevoirsComponent {

  assignments: Assignment[] = [
    { id: 1, nom: 'Devoir Angular', dateDeRendu: '2025-09-30', rendu: true  },
    { id: 2, nom: 'Devoir Math',    dateDeRendu: '2025-10-05', rendu: false },
  ];


}
