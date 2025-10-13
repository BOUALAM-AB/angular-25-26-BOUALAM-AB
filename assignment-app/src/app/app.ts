import { Component, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule, MatSidenavContainer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatListModule,
    MatIconModule, MatButtonModule, MatTooltipModule, MatSnackBarModule,
    NgIf
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  @ViewChild(MatSidenavContainer) container!: MatSidenavContainer;
  isCollapsed = false;

  constructor(public auth: AuthService, private snack: MatSnackBar) {}

 toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
    setTimeout(() => this.container?.updateContentMargins());
  }

  loginUser() {
    this.auth.loginAsUser();
    this.snack.open('Connecté en tant qu’utilisateur', 'OK', { duration: 2000 });
  }

  loginAdmin() {
    this.auth.loginAsAdmin();
    this.snack.open('Connecté en tant qu’administrateur', 'OK', { duration: 2000 });
  }

  logout() {
    this.auth.logout();
    this.snack.open('Déconnexion effectuée', 'OK', { duration: 2000 });
  }
}
