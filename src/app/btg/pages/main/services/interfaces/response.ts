import { ResponseLogin } from "../../../auth/services/interface/response";

export interface ResponseFunds {
  _id: string;
  nombre_fondo: string;
  monto_minimo: number;
  estado: string;
  categoria_fondo: string;
  __v: number;
}

export interface ResponseTransactions {
  saldo: number;
  tipo_accion: string;
  fondo: ResponseFunds;
  usuario: ResponseLogin;
  _id: string;
  fecha_creacion: string;
  __v: number;
  nombre_fondo?:string;
}

export interface ResponseUsers {
  nombre_usuario: string,
  correo: string,
  monto: number,
  password: string,
  fondos: string[],
  _id?: string,
  __v?: number
}



