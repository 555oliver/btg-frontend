import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResponseLogin } from '../../auth/services/interface/response';
import {
  ResponseFunds,
  ResponseTransactions,
  ResponseUsers,
} from './interfaces/response';
import {
  BodyTransactions,
  BodyTransactionsUpdate,
  BodyUser,
} from './interfaces/body-transactions';

export class UserService {
  public http = inject(HttpClient);
  public urlUser = `${environment.urlBackend}/api/v1/usuarios`;
  public urlFunds = `${environment.urlBackend}/api/v1/fondos`;
  public urlTransactions = `${environment.urlBackend}/api/v1/transaciones`;
  private usuariosSubject = new BehaviorSubject<any>({});
  usuarios$ = this.usuariosSubject.asObservable();

  /**
   * servicio para traer un usuario por ID
   * @param id
   * @returns
   */
  public userById(id: string | null): Observable<ResponseLogin> {
    return this.http.get<ResponseLogin>(`${this.urlUser}/${id}`);
  }

  /**
   * servicio para traer un usuario por ID
   * @param id
   * @returns
   */
  public userByIdSubject(id: string | null): any {
    this.http
      .get<ResponseLogin>(`${this.urlUser}/${id}`)
      .subscribe((usuarios) => {
        this.usuariosSubject.next(usuarios);
      });
  }

  /**
   * servicio para crear un usuario
   * @param body
   * @returns
   */
  public createUser(body: BodyUser): Observable<ResponseUsers> {
    return this.http.post<ResponseUsers>(`${this.urlUser}`, body);
  }

  /**
   * servicio para actualizar un usuairo
   * @param id
   * @param body
   * @returns
   */
  public userUpdate(id: string, body: any) {
    return this.http.patch(`${this.urlUser}/${id}`, body).pipe(
      tap(() => {
        this.userByIdSubject(localStorage.getItem('idUser'));
      })
    );
  }

  /**
   * servicio para traer todos los fondos
   * @returns
   */
  public fundsAll(): Observable<ResponseFunds[]> {
    return this.http.get<ResponseFunds[]>(`${this.urlFunds}`);
  }
  /**
   * servicio para traer un fondo por ID
   * @param id
   * @returns
   */
  public fundsById(id: string): Observable<ResponseFunds> {
    return this.http.get<ResponseFunds>(`${this.urlFunds}/${id}`);
  }
  /**
   * metodo para traer todas las transacciones
   * @returns
   */
  public allTransactions(): Observable<ResponseTransactions[]> {
    return this.http.get<ResponseTransactions[]>(`${this.urlTransactions}`);
  }
  /**
   * metodo para crear una trasaccion
   * @param body
   * @returns
   */
  public createTransactions(
    body: BodyTransactions
  ): Observable<ResponseTransactions> {
    return this.http.post<ResponseTransactions>(
      `${this.urlTransactions}`,
      body
    );
  }
  /**
   * metodo para actualizar trasacciones
   * @param body
   * @param id
   * @returns
   */
  public updateTransactions(
    body: BodyTransactionsUpdate,
    id: string
  ): Observable<ResponseTransactions> {
    return this.http.patch<ResponseTransactions>(
      `${this.urlTransactions}/${id}`,
      body
    );
  }
}
