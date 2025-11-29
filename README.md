#  Assignment App – TP Angular + Node/MongoDB (TP5)

#  Abdellah Boualam
Master 1 MIAGE – Université Côte d’Azur (DS4H)
Cours : Programmation Web Angular – Michel Buffa (2025)
Entreprise d’alternance : PRO BTP Group – Projet GadarIhm

##  Objectif du projet

Développer une application complète de **gestion de devoirs** (“Assignments App”) en **Angular** avec un **backend Node.js + Express + MongoDB**.  
Ce projet reprend les différents TPs du cours *Programmation Web Angular* (Michel Buffa & Léo Donat) et ajoute les étapes finales :  
 **Peuplement de la base** et **Pagination complète (back + front)**.

---

##  Architecture générale

###  Frontend
- **Framework :** Angular 17+
- **UI :** Angular Material
- **Langage :** TypeScript
- **Gestion des données :** RxJS, Observables, BehaviorSubject
- **Composants standalone** (pas de `NgModule`)

###  Backend
- **Serveur :** Node.js / Express
- **Base de données :** MongoDB Atlas (Cloud)
- **ORM :** Mongoose
- **Plugin :** mongoose-aggregate-paginate-v2 (pour la pagination)

---

##  Fonctionnalités principales

### 1️ Routage et navigation Angular
Configuration dans `app.routes.ts` :
- `/home` → liste des assignments  
- `/add` → ajout d’un nouveau devoir  
- `/assignment/:id` → détails d’un devoir  
- `/assignment/:id/edit` → édition (protégée)  
- `/generation` → génération de données  

Redirection par défaut vers `/home`.  
Certaines routes sont protégées par un **authGuard**.

---

### 2️ Authentification simulée
- **Service : `AuthService`**
  - `loginAsUser()` / `loginAsAdmin()` / `logout()`
  - `isLogged()` / `isAdmin()`
- Permet de :
  - Afficher ou masquer les boutons “EDIT” et “Supprimer”
  - Protéger la route `/assignment/:id/edit` (réservée aux admins)

---

### 3️ Services

#### `AssignmentsService`
Gère la communication avec le backend et maintient un cache local via `BehaviorSubject`.

- Méthodes principales :
  - `getAssignmentsPage(page, limit)` → récupère une page d’assignments  
  - `getAssignment(id)` → un devoir précis  
  - `addAssignment(a)` → ajoute un devoir  
  - `updateAssignment(a)` → met à jour  
  - `deleteAssignmentById(id)` → supprime  
  - `peuplerBDAvecForkJoin()` → insère 500 devoirs fictifs dans la BD  

#### `LoggingService`
- Trace les opérations CRUD dans la console.

#### `AuthService`
- Gère l’état de connexion et les rôles (utilisateur/admin).

---

### 4️ Composants principaux

#### 🗂 `ListeDevoirsComponent`
- Affiche la liste paginée des devoirs avec **Angular Material (`MatList`)**
- Bouton “Ajouter Assignment”
- Bouton “PeuplerBD” (pour insérer les 500 devoirs de test)
- Pagination :
  - Variables : `page`, `limit`, `totalDocs`, `totalPages`, `hasPrevPage`, `hasNextPage`
  - Navigation via boutons :
    - Première / Précédente / Suivante / Dernière
  - Désactivation automatique des boutons en début/fin de liste

####  `AddAssignmentComponent`
- Formulaire avec `[(ngModel)]` (nom, date)
- Validation simple (champs obligatoires)
- Émission d’un événement `(create)` vers le parent
- Ajout via le service

####  `AssignmentDetailComponent`
- Affiche les informations détaillées du devoir sélectionné
- Bouton “Marquer comme rendu”
- Bouton “EDIT” visible seulement pour l’admin
- Bouton “Supprimer” actif uniquement pour l’admin

####  `EditAssignmentComponent`
- Formulaire pré-rempli pour modifier un devoir existant
- Sauvegarde via `updateAssignment()`
- Redirection vers `/home` après mise à jour
- Route protégée par le `authGuard`


---

##  Fonctionnalités backend

Le backend est développé avec **Node.js** et **Express**, et il interagit avec **MongoDB** via **Mongoose**.  
Son rôle est de gérer la persistance des données, les opérations CRUD, et d’ajouter une couche de pagination.

### 🔹 Connexion à la base MongoDB
Le serveur établit une connexion à une base hébergée sur **MongoDB Atlas**.  
Une fois connecté, il affiche un message de confirmation dans la console.  
Cette connexion permet à l’application d’interagir avec une base de données hébergée dans le cloud, partagée entre les différents environnements (local ou distant).

### 🔹 Modèle de données
Le modèle `Assignment` décrit la structure des devoirs stockés dans la base :
- `id` : identifiant numérique unique (auto-incrémenté)
- `nom` : nom du devoir
- `dateDeRendu` : date prévue de rendu
- `rendu` : booléen indiquant si le devoir est rendu ou non

Une logique d’auto-incrément est implémentée via un **compteur Mongoose** (`Counter`) afin de générer des IDs uniques, indépendants de l’identifiant MongoDB `_id`.

### 🔹 Gestion des routes Express
Le backend expose plusieurs routes REST :
- `GET /api/assignments` → retourne la liste paginée des devoirs  
- `GET /api/assignments/:id` → retourne un devoir précis  
- `POST /api/assignments` → ajoute un nouveau devoir  
- `PUT /api/assignments` → met à jour un devoir existant  
- `DELETE /api/assignments/:id` → supprime un devoir  

Toutes les routes renvoient des réponses JSON exploitables directement par le frontend Angular.

### 🔹 Pagination côté serveur
La pagination repose sur le plugin **mongoose-aggregate-paginate-v2**.  
Celui-ci permet de récupérer les devoirs page par page, avec des informations complètes :
- nombre total de documents (`totalDocs`)
- page courante (`page`)
- nombre total de pages (`totalPages`)
- indicateurs (`hasPrevPage`, `hasNextPage`, `prevPage`, `nextPage`)

Ce mécanisme rend la récupération des données plus performante et plus légère, surtout avec plusieurs centaines d’enregistrements.

---

##  Pagination côté frontend

La pagination est gérée de manière fluide dans Angular :

- Le service `AssignmentsService` interroge le backend en passant les paramètres `page` et `limit`.
- Le composant `ListeDevoirsComponent` met à jour dynamiquement :
  - la page actuelle,
  - le nombre total de documents,
  - le nombre total de pages,
  - et l’état des boutons de navigation.
- Le template affiche une **barre de pagination** permettant de naviguer entre les pages de résultats.

---

##  Peuplement automatique (Seeding)

Une méthode `peuplerBDAvecForkJoin()` a été ajoutée pour insérer automatiquement **500 devoirs fictifs** dans la base de données.  
Ces données sont définies dans un fichier `data.ts` (format JSON exporté).  
Le bouton “PeuplerBD” dans la liste appelle cette méthode et recharge la base.

Ce mécanisme permet de tester la pagination et les performances de l’application avec un grand volume de données.

---

##  Technologies utilisées


|---------------------|---------------------------------------------|
| **Frontend**        | Angular, Angular Material, TypeScript, RxJS |
| **Backend**         | Node.js, Express, Mongoose                  |
| **Base de données** | MongoDB Atlas (Cloud)                       |
| **Plugins**         | mongoose-aggregate-paginate-v2              |
| **Autres**          | body-parser, observables, BehaviorSubject   |
|---------------------|---------------------------------------------|

---

##  Structure du projet

assignment-app/
├── api/
│   ├── model/
│   │   ├── assignment.js
│   │   └── counter.js
│   ├── routes/
│   │   └── assignments.js
│   ├── server.js
│   └── package.json
│
├── front/
│   ├── src/app/
│   │   ├── pages/
│   │   │   ├── liste-devoirs/
│   │   │   │     ├── add-assignment/
│   │   │   │     ├── assignment-detail/
│   │   │   └── edit-assignment/
│   │   ├── model/
│   │   ├── service/
│   │   └── shared/data.ts
│   └── package.json
│
└── README.md

##  Lancer le projet

### 1️ Démarrer le backend
```bash
cd api
npm install
node server.js
```
---

### 2 Démarrer le backend
```bash
cd front
npm install
ng serve
```

---
