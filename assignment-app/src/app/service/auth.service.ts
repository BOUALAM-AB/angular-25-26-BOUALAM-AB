import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private logged = false;
  private admin = false;

  constructor() {}


  loginAsUser() {
    this.logged = true;
    this.admin = false;
    console.log('Connecté comme utilisateur');
  }


  loginAsAdmin() {
    this.logged = true;
    this.admin = true;
    console.log('Connecté comme administrateur');
  }


  logout() {
    this.logged = false;
    this.admin = false;
    console.log('Déconnexion');
  }

  
  isLogged() {
    return this.logged;
  }

  isAdmin() {
    return this.admin;
  }
}
