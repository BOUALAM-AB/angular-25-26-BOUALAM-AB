import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './add-assignment.html',
  styleUrl: './add-assignment.scss'
})
export class AddAssignment {
  @Output() create = new EventEmitter<{ nom: string; dateDeRendu: string }>();

  nom = '';
  date = '';

  get disabled() { return !(this.nom.trim() && this.date); }

  submit() {
    if (this.disabled) return;
    this.create.emit({ nom: this.nom.trim(), dateDeRendu: this.date });
    this.nom = '';
    this.date = '';
  }
}
