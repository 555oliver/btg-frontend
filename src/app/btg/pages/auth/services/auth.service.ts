import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Login } from './interface/login';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseLogin } from './interface/response';


export class AuthService {
  public http = inject(HttpClient);
  public urlLogin = `${environment.urlBackend}/api/v1/usuarios/login`;

  /**
   * metodo para consumir servicio de logeo
   * @param body 
   * @returns 
   */
  public login(body: Login): Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(this.urlLogin, body).pipe(
      tap(response => localStorage.setItem('idUser', response._id))
    );
  }
}
