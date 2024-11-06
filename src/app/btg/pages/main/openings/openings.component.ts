import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {
  ResponseFunds,
  ResponseTransactions,
} from '../services/interfaces/response';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { BodyTransactions } from '../services/interfaces/body-transactions';
@Component({
  selector: 'app-openings',
  standalone: false,
  templateUrl: './openings.component.html',
  styleUrl: './openings.component.scss',
})
export class OpeningsComponent implements OnInit{
  public funds: ResponseFunds[] = [];
  public form!: FormGroup;
  public mainService = inject(UserService);
  public formBuilder = inject(FormBuilder);
  public transactions: ResponseTransactions[] = [];
  public user_amount = 0;
  ngOnInit(): void {
    this.dataBuilder();
    this.fundsAlls();
    this.transactionsAlls();
    this.mainService.userById(localStorage.getItem('idUser')!)?.subscribe((response => this.user_amount = response.monto ))

  }

  public dataBuilder(): void {
    this.form = this.formBuilder.group({
      saldo: [0],
      fondo: [''],
    });
  }

  /**
   * metodo para cargar las transaciones por usuario logeado y solo las aperturas
   */

  public transactionsAlls(): void {
    this.mainService.allTransactions()?.subscribe({
      next: (response) => {
        this.transactions = response.filter(
          (value) =>
            value.usuario?._id === localStorage.getItem('idUser')! &&
            value.tipo_accion === 'Apertura'
        );
      },
    });
  }

  /**
   * metodo para traer todos los fondos
   */
  public fundsAlls(): void {
    this.mainService.fundsAll()?.subscribe({
      next: (response) => (this.funds = response),
    });
  }
  /**
   * metodo para crear un fondo de apertura
   * @param data
   */
  public createFund(data: any): void {
    if (this.validateAmount(data)) {
      const body: BodyTransactions = {
        saldo: data.saldo,
        tipo_accion: 'Apertura',
        fondo: data.fondo,
        usuario: localStorage.getItem('idUser')!,
      };
      this.mainService.createTransactions(body)?.subscribe({
        next: (response) => this.nextResponse(response),
      });
    }
  }
/**
 * metodo para hacer operacion de resta cuando se crea una nueva apertura
 * @param response 
 */
  nextResponse(response: ResponseTransactions) {
    if (response) {
      Swal.fire({
        title: 'CREADO',
        text: `Apertura Creada Correctamente`,
        icon: 'success',
      });
      const user_id = localStorage.getItem('idUser')!;
      const balance_transaction = response.saldo;
      const operation = this.user_amount - balance_transaction;
      const body = {
        monto: operation
      }
      this.mainService.userUpdate(user_id, body)?.subscribe();
      this.transactionsAlls();
    }
  }

  /**
   * metodo para validar que el saldo a ingresar a la apertura cumpla con el monto minimo del fondo seleccionado
   */
  public validateAmount(data: any): boolean {
    const fondo = this.funds.find(
      (value: ResponseFunds) => value._id === data.fondo
    );
    if (fondo?.monto_minimo! < data.saldo) {
      return true;
    }
    Swal.fire({
      title: 'ERROR',
      text: `El monto minimo del fondo ${fondo?.nombre_fondo} no puede ser menor al monto inicial ingresado de ${data.saldo}`,
      icon: 'error',
    });
    return false;
  }

  /**
   * metodo para cancelar una apertura y sumarle el monto que tenia esa apertura cancelada
   * @param idTrasaction 
   */

  public cencellationTransaction(idTrasaction: string): void {
    console.log(idTrasaction);
    Swal.fire({
      title: 'Seguro desea Cancelar esta Apertura?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: 'red',
      denyButtonColor: 'gray',
      confirmButtonText: 'Cancelar',
      denyButtonText: `No Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      const body = {
        tipo_accion: 'Cancelación',
      };

      if (result.isConfirmed) {
        this.mainService.updateTransactions(body, idTrasaction)?.subscribe({
          next: (response) => {
            if (response) {
              Swal.fire('Apertura Cancelada', '', 'success');
              const user_id = localStorage.getItem('idUser')!;
              const balance_transaction = response.saldo;
              const operation = this.user_amount + balance_transaction;
              const body = {
                monto: operation
              }
              this.mainService.userUpdate(user_id, body)?.subscribe();
              this.transactionsAlls();
            }
          },
        });
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', '', 'info');
      }
    });
  }
}
