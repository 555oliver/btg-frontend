export interface BodyTransactions{
    saldo: number;
    tipo_accion: string;
    fondo: string;
    usuario: string;
}

export interface BodyTransactionsUpdate{
    tipo_accion: string;
}


export interface BodyUser{
    nombre_usuario: string;
    correo  : string;
    password: string;
    monto: number;
}

