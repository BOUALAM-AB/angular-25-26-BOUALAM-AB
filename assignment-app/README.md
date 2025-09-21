# Assignment App - TP Angular (Rendu1)

##  Objectif du TP
Implémenter les fonctionnalités demandées dans les transparents 55 → 83 du cours Angular :
- utilisation d'Angular Material (toolbar, sidenav, cards, buttons, inputs)
- création de plusieurs composants standalone
- gestion du routing
- data binding et formulaires


---

##  Fonctionnalités implémentées

### 1. Toolbar (barre supérieure)
- Icône **maison** → retour à la page "Liste des devoirs"
- Titre de l'application : *Assignment App*
- Icône **person** → prévue pour la connexion plus tard

### 2. Sidenav (menu latéral gauche)
Avec des liens de navigation (routerLink) vers :
- Liste des devoirs
- Ajout d'un devoir
- Modification d'un devoir
- Suppression d'un devoir
- Génération de données

### 3. Routing
- Configuration des routes Angular (`app.routes.ts`)
- Navigation entre les pages via `<router-outlet>`

### 4. Liste des devoirs
- Affichage d'une liste de devoirs avec la nouvelle syntaxe Angular **@for** et **@if**
- Utilisation d'une **directive custom `appRendu`** :
  - Texte vert si le devoir est rendu
  - Texte rouge sinon

### 5. Ajout d'un devoir
- Formulaire avec Angular Material (`MatFormField`, `MatInput`, `MatButton`)
- Utilisation du **data binding** :
  - `[disabled]` → désactive le bouton si les champs sont vides
  - `(submit)` → exécute la méthode `onSubmit()`
  - `[(ngModel)]` → lie directement les champs au TS
- À ce stade, le devoir saisi est simplement affiché dans la console (pas encore relié à la liste car il n'ya pas de backend )

### 6. Autres pages
- Modification, Suppression, Génération de données : composants créés et intégrés au routing, contenus encore à implémenter.

---

##  Technologies utilisées
- Angular 20 (standalone components + nouvelles directives @for/@if)
- Angular Material (Toolbar, Sidenav, Buttons, Inputs, Cards)

---

##  Lancer le projet
```bash
npm install
ng serve
