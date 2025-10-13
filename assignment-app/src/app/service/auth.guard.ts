import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLogged() && auth.isAdmin()) {
    console.log(' AuthGuard: accès autorisé');
    return true;
  }


  console.warn(' AuthGuard: accès refusé');
  router.navigate(['/home']);
  return false;
};
