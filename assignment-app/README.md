#  Assignment App – TP Angular (Rendu 4)

##  Objectif du TP

Avancer le projet Angular en suivant les transparents **149 → 188** du cours :  
implémentation du **routage**, des **routes protégées**, et d’un **menu latéral réactif** avec Angular Material.

---

##  Fonctionnalités implémentées

### 1. Routage Angular
- Configuration dans `app.routes.ts` avec les chemins :
  - `/home` → liste des devoirs
  - `/add` → ajout d’un devoir
  - `/assignment/:id` → détails d’un devoir
  - `/assignment/:id/edit` → édition d’un devoir
  - `/generation` → génération de données
- Redirection par défaut (`path: '', redirectTo: 'home'`)
- Route d’édition protégée par un **authGuard**.

### 2. Services
- **`AssignmentsService`**
  - Contient un tableau local d’`Assignment` (simulation sans backend)
  - Fournit les méthodes CRUD :
    - `getAssignments()` / `getAssignment(id)`
    - `addAssignment()`
    - `updateAssignment()`
    - `deleteAssignment()`
  - Retourne des **Observables** simulées avec `of()`
  - Appelle `LoggingService` pour afficher les actions dans la console

- **`LoggingService`**
  - Service simple qui trace les opérations (`ajout`, `update`, `delete`) dans la console

- **`AuthService`**
  - Simule une authentification **utilisateur / administrateur**
  - Permet de tester les routes protégées et l’état du bouton **EDIT**
  - Méthodes :
    - `loginAsUser()`
    - `loginAsAdmin()`
    - `logout()`
    - `isLogged()`
    - `isAdmin()`

### 3. Guard `authGuard`
- Bloque l’accès à `/assignment/:id/edit` si l’utilisateur n’est pas **admin**
- Redirige vers `/home`
- Exemple :
  ```ts
  export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (auth.isLogged() && auth.isAdmin()) return true;
    router.navigate(['/home']);
    return false;
  };

##  Composants principaux

###  `ListeDevoirsComponent`
- Affiche la liste des devoirs avec **Angular Material (`MatList`)**
- Permet la **sélection d’un devoir** pour afficher ses détails
- Bouton **“Ajouter Assignment”** → ouvre le formulaire d’ajout
- Communication **Parent ↔ Enfant** via des événements :
  - `(create)` → ajoute un nouveau devoir
  - `(rendu)` → marque un devoir comme rendu
  - `(deleteRequest)` → supprime un devoir

---

###  `AddAssignment`
- Formulaire d’ajout avec **liaison bidirectionnelle** `[(ngModel)]` pour le nom et la date
- Sur **soumission du formulaire (`(submit)`)**, émet un événement `(create)` vers le parent
- Le **bouton “Ajouter”** est **désactivé** tant que les champs sont vides

---

###  `AssignmentDetail`
- Affiche les **informations détaillées** du devoir sélectionné
- Si le devoir **n’est pas rendu** → bouton “Marquer comme rendu”
- Si **l’utilisateur admin** est connecté → bouton **EDIT** actif  
  Sinon → bouton **EDIT** **désactivé (grisé)**
- Bouton **Supprimer** pour retirer le devoir sélectionné

---

###  `EditAssignmentComponent`
- Formulaire **pré-rempli** pour modifier un devoir existant
- Bouton **Sauver** met à jour le devoir via `AssignmentsService`
- Après sauvegarde → **redirection automatique vers `/home`**
- Route **protégée** par le `authGuard` (accessible uniquement aux administrateurs)

---

###  `GenerationDonneesComponent`
- Composant “squelette” prévu pour la génération de données de test
- Servira à créer rapidement plusieurs devoirs simulés

---

## Lancer le projet
```bash
npm install
ng serve
```


