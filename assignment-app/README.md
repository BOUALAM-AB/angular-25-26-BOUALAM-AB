# Assignment App - TP Angular (Rendu3)

## Objectif du TP
Implémenter les fonctionnalités demandées dans les transparents **116 → 148** du cours Angular :
- Création et injection de **services Angular**
- Utilisation des **Observables** pour la gestion des données
- Mise en place d’un **LoggingService** (service dans un service)
- Appels asynchrones simulés avec `of()`
- Réorganisation du code pour respecter la structure **composants ↔ services**

---

## Fonctionnalités implémentées

### 1. Service `AssignmentsService`
- Créé dans `src/app/service/assignments.service.ts`
- Contient un tableau local de devoirs :
  ```ts
  private assignments = [
    { id: 1, nom: 'Devoir Angular', dateDeRendu: new Date('2025-09-30'), rendu: true },
    { id: 2, nom: 'Devoir Math', dateDeRendu: new Date('2025-10-05'), rendu: false }
  ];
  ```
- **Méthodes CRUD :**
  - `getAssignments()` → renvoie la liste (Observable)
  - `getAssignment(id)` → renvoie un devoir précis
  - `addAssignment(a)` → ajoute un devoir
  - `updateAssignment(a)` → met à jour un devoir
  - `deleteAssignment(a)` → supprime un devoir
- Retourne les données via `of(...)` pour simuler un backend asynchrone.

---

### 2. Service `LoggingService`
- Permet de tracer les opérations effectuées :
  ```ts
  console.log(`assignment ${nom} ${action}`);
  ```
- Injecté dans `AssignmentsService` (démonstration d’un service dans un service).


---

### 3. Composants utilisés
- `AddAssignment` → formulaire d’ajout  
- `AssignmentDetail` → affichage des détails + suppression/rendu  
- `ListeDevoirsComponent` → composant principal  
- Tous les composants sont **standalone** et utilisent **Angular Material** (`MatCard`, `MatList`, `MatButton`, etc.)

---

## Technologies utilisées
- **Angular 20** (standalone components + nouvelles directives `@for`, `@if`)
- **Angular Material** (cards, lists, inputs, buttons, checkbox)

---

## Lancer le projet
```bash
npm install
ng serve
```


