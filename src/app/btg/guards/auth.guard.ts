import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * implementacion de un guard para proteger las rutas de un usuario en sesion
 * @param route 
 * @param state 
 * @returns 
 */
export const authGuard: CanActivateFn = (route, state) => {
  const id = localStorage.getItem('idUser');
  if(id !== null){
    return true;
  }else{
    return inject(Router).createUrlTree(['btg/auth/login'])
  }
};
