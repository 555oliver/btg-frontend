import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../main/services/user.service';
import { BodyUser } from '../../main/services/interfaces/body-transactions';
import Swal from 'sweetalert2';
import { ResponseUsers } from '../../main/services/interfaces/response';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public router = inject(Router);
  public formBuilder = inject(FormBuilder);
  public mainService = inject(UserService);

  ngOnInit(): void {
    this.dataBuilder();
  }

  public dataBuilder(): void {
    this.form = this.formBuilder.group({
      nombre_usuario: [''],
      correo: [''],
      password: [''],
      monto: [0],
      fondos: [[]],
    });
  }

  /**
   * metodo para volver a la pantalla de login
   */
  public backRegister(): void {
    this.router.navigateByUrl('/btg/auth/login');
  }

  /**
   * metodo para consumir servicio de registro de usuairio
   * @param data
   */
  public registerUser(data: BodyUser) {
    this.mainService.createUser(data).subscribe({
      next: (response) => this.nextResponse(response),
      error: (err) => this.errorResponse(err),
    });
  }

  /**
   * metodo para obtener la respuesta de backend y mostrar mensaje y cargar la pangina de login
   * @param response
   */
  public nextResponse(response: ResponseUsers): void {
    if (response) {
      Swal.fire({
        title: 'OK',
        text: `Usuario Creado Correctamente`,
        icon: 'success',
      });
      this.router.navigate(['/btg/auth/login']);
      this.form.reset();
    }
  }

  /**
   * metodo para manejo de errores en el consumo del servicio
   * @param err
   */

  public errorResponse(err: any): void {
    if (err?.error?.code === 11000) {
      Swal.fire({
        title: 'ERROR',
        text: `El correo ya esta registrado`,
        icon: 'error',
      });
    }
    if (err?.error?.message) {
      Swal.fire({
        title: 'ERROR',
        text: `${err?.error?.message}`,
        icon: 'error',
      });
    }
  }

  exit(): void{
    this.router.navigate(['/btg/btg-initial-page/initial-page'])
  }
}
