#  Assignment App – TP Angular + Node/MongoDB (TP6)

#  Abdellah BOUALAM
Master 1 MIAGE – Université Côte d’Azur (DS4H)
Cours : Programmation Web Angular – Michel Buffa (2025)


##  Objectif du projet

### Développer une application complète de gestion des devoirs (Assignments App) comprenant :
-Un frontend Angular moderne (Standalone Components, Angular Material, RxJS)
-Un backend Node.js + Express
-Une base MongoDB Atlas
-La pagination complète (front + back)
-Le peuplement automatique de la base de données
-L’hébergement 100% online : BACK + FRONT

### Le projet reprend le TP du cours Angular, mais pousse beaucoup plus loin :
- pagination avancée
- recherche + filtres
- rendu/non-rendu
- auto-incrément ID
- seeding massif
- hébergement Render
- application fonctionnelle complète

---

# Liens du projet (hébergé en ligne)

## Service	URL :	https://angular-25-26-boualam-ab.onrender.com

---
##  Frontend Angular – Fonctionnalités

### ✔ 1. Liste des devoirs (`ListeDevoirsComponent`)

- Liste paginée avec Angular Material  
- Recherche en temps réel  
- Filtres disponibles :
  - **Tous**
  - **Rendus**
  - **Non rendus**
- Résumé automatique :
  - Page **X / Y**
  - Nombre total d’éléments
  - Nombre d’éléments filtrés
- Système de pagination :
  - **Première** / **Précédente** / **Suivante** / **Dernière**
- Navigation directe vers la page de détail
- Boutons d’action :
  - **Peupler BD** (génère 500 assignments)
  - **Nouvel assignment**

---

### ✔ 2. Ajout d’un devoir

- Formulaire moderne basé sur **Angular Material**
- Two-way binding avec `ngModel`
- Validation des champs
- Envoi vers l’API via `AssignmentsService`
- Redirection vers `/home` après l’ajout

---

### ✔ 3. Détail d’un assignment (`AssignmentDetailComponent`)

- Affichage complet des informations du devoir
- Bouton **Marquer comme rendu**
- Actions réservées à l’admin :
  - Modifier
  - Supprimer

---

### ✔ 4. Modification d’un devoir (`EditAssignmentComponent`)

- Formulaire pré-rempli avec les données du devoir
- Mise à jour via l’API (`updateAssignment`)
- Route protégée par un **authGuard**
- Redirection vers la page de liste après validation

---

### ✔ 5. Authentification simulée (`AuthService`)

#### Fonctions :

- `loginAsUser()`
- `loginAsAdmin()`
- `logout()`
- `isLogged()`
- `isAdmin()`

#### Impact sur l’UI :

- Boutons **EDIT** & **DELETE** visibles uniquement pour un admin
- Route `/assignment/:id/edit` protégée (interdite aux utilisateurs simples)

---

### ✔ 6. Service de gestion des données (`AssignmentsService`)

- `getAssignmentsPage(page, limit)` — pagination backend  
- `getAssignment(id)` — obtenir un devoir précis  
- `addAssignment(a)` — ajouter un devoir  
- `updateAssignment(a)` — modifier un devoir  
- `deleteAssignmentById(id)` — supprimer un devoir  
- `peuplerBDAvecForkJoin()` — création de 500 devoirs depuis un fichier JSON  
- Cache local performant via **BehaviorSubject**

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


##  Structure du projet

<img width="290" height="456" alt="image" src="https://github.com/user-attachments/assets/3416f8d0-77d0-4645-8ac2-8ea24cd6db63" />

---

<img width="1907" height="948" alt="image" src="https://github.com/user-attachments/assets/8016a7c0-b889-4f8f-9547-a29c8fedb95a" />

<img width="1913" height="947" alt="image" src="https://github.com/user-attachments/assets/baf632ef-db6a-40ee-84a5-419ac471a659" />





