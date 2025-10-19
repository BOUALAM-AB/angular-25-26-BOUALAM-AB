// service/assignments.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap, forkJoin } from 'rxjs';
import { Assignment } from '../model/assignment.model';
import { bdInitialAssignments } from '../shared/data';
import { PaginatedAssignments } from '../model/pagination.model';


@Injectable({ providedIn: 'root' })
export class AssignmentsService {
  private base = 'http://localhost:8010/api/assignments';

  private _assignments = new BehaviorSubject<Assignment[]>([]);
  readonly assignments$ = this._assignments.asObservable();

  // Index O(1) pour accès instantané
  private _byId = new Map<number, Assignment>();

  constructor(private http: HttpClient) {}

  private normalizeDate(a: Assignment): Assignment {
    return { ...a, dateDeRendu: new Date(a.dateDeRendu) } as Assignment;
  }

  private indexAll(list: Assignment[]) {
    this._byId.clear();
    list.forEach(a => this._byId.set(a.id!, a));
  }

  loadAll(): void {
    this.http.get<Assignment[]>(this.base)
      .subscribe(list => {
        const normalized = list.map(a => this.normalizeDate(a));
        this._assignments.next(normalized);
        this.indexAll(normalized);
      });
  }

  /** Accès immédiat si présent en cache */
  getFromStore(id: number): Assignment | undefined {
    return this._byId.get(id);
  }

  /** Pré-chargement optionnel (ne casse pas l’UI si déjà en cache) */
  prefetch(id: number) {
    if (this._byId.has(id)) return;
    this.http.get<Assignment>(`${this.base}/${id}`)
      .subscribe(a => {
        const n = this.normalizeDate(a);
        this._byId.set(n.id!, n);
        // Mettre à jour la liste (immutabilité)
        const cur = this._assignments.value;
        const exists = cur.some(x => x.id === n.id);
        this._assignments.next(exists ? cur.map(x => x.id === n.id ? n : x) : [...cur, n]);
      });
  }

  /** Fallback HTTP si non présent */
  getAssignment(id: number): Observable<Assignment> {
    const cached = this.getFromStore(id);
    if (cached) return of(cached);
    return this.http.get<Assignment>(`${this.base}/${id}`).pipe(
      tap(a => {
        const n = this.normalizeDate(a);
        this._byId.set(n.id!, n);
        const cur = this._assignments.value;
        const exists = cur.some(x => x.id === n.id);
        this._assignments.next(exists ? cur.map(x => x.id === n.id ? n : x) : [...cur, n]);
      })
    );
  }

  addAssignment(a: Assignment): Observable<Assignment> {
    const payload = { ...a, dateDeRendu: new Date(a.dateDeRendu).toISOString() };
    return this.http.post<Assignment>(this.base, payload).pipe(
      tap(newA => {
        const n = this.normalizeDate(newA);
        this._byId.set(n.id!, n);
        const cur = this._assignments.value;
        this._assignments.next([...cur, n]);
      })
    );
  }

  updateAssignment(a: Assignment): Observable<{message:string; assignment:Assignment}> {
    const payload = { ...a, dateDeRendu: new Date(a.dateDeRendu).toISOString() };
    return this.http.put<{message:string; assignment:Assignment}>(this.base, payload).pipe(
      tap(res => {
        const n = this.normalizeDate(res.assignment);
        this._byId.set(n.id!, n);
        const cur = this._assignments.value;
        const upd = cur.map(x => x.id === n.id ? n : x);
        this._assignments.next(upd);
      })
    );
  }

  deleteAssignmentById(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`).pipe(
      tap(() => {
        this._byId.delete(id);
        const cur = this._assignments.value;
        this._assignments.next(cur.filter(x => x.id !== id));
      })
    );
  }


peuplerBDAvecForkJoin(): Observable<any> {
  const calls = bdInitialAssignments.map(a => this.addAssignment({
    id: a.id, nom: a.nom, dateDeRendu: new Date(a.dateDeRendu), rendu: !!a.rendu
  }));
  return forkJoin(calls);
}


getAssignmentsPage(page: number, limit: number): Observable<PaginatedAssignments> {
  return this.http.get<PaginatedAssignments>(`${this.base}?page=${page}&limit=${limit}`).pipe(
    tap(data => {
      // on normalise et on met à jour le cache de la liste visible
      const normalized = data.docs.map(a => this.normalizeDate(a));
      this._assignments.next(normalized);
      this.indexAll(normalized);
    })
  );
}


}
