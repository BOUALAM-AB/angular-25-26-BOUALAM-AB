import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-ajout-devoir',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './ajout-devoir.component.html',
  styleUrl: './ajout-devoir.component.scss'
})

export class AjoutDevoirComponent {
  nomDevoir = '';
  dateDeRendu = ''; 

  get boutonDesactive() {
    return !(this.nomDevoir.trim() && this.dateDeRendu);
  }

  onSubmit() {
    if (this.boutonDesactive) return;
    console.log('NOUVEAU devoir :', this.nomDevoir, '→', this.dateDeRendu);
    this.nomDevoir = '';
    this.dateDeRendu = '';
  }
}
