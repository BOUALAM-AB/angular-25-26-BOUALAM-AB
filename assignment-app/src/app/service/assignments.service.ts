import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../model/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({ providedIn: 'root' })
export class AssignmentsService {
  
  private assignments: Assignment[] = [
    { id: 1, nom: 'Devoir Angular', dateDeRendu: new Date('2025-09-30'), rendu: true },
    { id: 2, nom: 'Devoir Math',    dateDeRendu: new Date('2025-10-05'), rendu: false },
  ];

  constructor(private logger: LoggingService) {}

  
  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

 
  getAssignment(id: number): Observable<Assignment | undefined> {
    const found = this.assignments.find(a => a.id === id);
    return of(found);
  }

  
  addAssignment(a: Assignment): Observable<{message: string}> {
    if (!a.id) {
      const nextId = this.assignments.length ? Math.max(...this.assignments.map(x => x.id)) + 1 : 1;
      a.id = nextId;
    }
    this.assignments.unshift(a);
    this.logger.log(`${a.nom}`, 'ajout');
    return of({ message: 'Assignment ajouté' });
  }

 
  updateAssignment(a: Assignment): Observable<{message: string}> {
    this.assignments = this.assignments.map(x => x.id === a.id ? a : x);
    this.logger.log(`${a.nom}`, 'update');
    return of({ message: 'Assignment mis à jour' });
  }

  
  deleteAssignment(a: Assignment): Observable<{message: string}> {
    this.assignments = this.assignments.filter(x => x.id !== a.id);
    this.logger.log(`${a.nom}`, 'delete');
    return of({ message: 'Assignment supprimé' });
  }
}
