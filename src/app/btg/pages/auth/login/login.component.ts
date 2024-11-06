import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Login } from '../services/interface/login';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
  router = inject(Router);
  builderForm = inject(FormBuilder);
  authService = inject(AuthService);
  ngOnInit(): void {
    this.dataBuilder();
  }

  public dataBuilder(): void{
    this.form = this.builderForm.group({
      correo: ['', [Validators.email]],
      password: ['', [Validators.min(4),Validators.max(50)]]
    })
  }

  /**
   * metodo para ir a la pantalla de registro
   */
  public register(){
    this.router.navigateByUrl('/btg/auth/register')
  }

  /**
   * metodo para consumir servicio de logeo para la aplicacion
   * @param data 
   */
  public login(data: Login): void{
    this.authService.login(data).subscribe({
      next: (response => this.nextResponde(response)),
      error: (err => this.errorResponse(err))
    })
  }

  /**
   * metodo para obtener la respuesta de backend y mostrar mensaje y cargar la pangina princial
   * @param response 
   */
  nextResponde(response: any){
    if(response){
      Swal.fire({
        title: "OK",
        text: `Cardando...`,
        icon: "success"
      });
      this.router.navigate(['/btg/main/main-page/initial'])
      Swal.close()
    }
  }

  /**
   * metodo para manejo de errores en el consumo del servicio
   * @param err 
   */

  errorResponse(err: any): void{
    if(err){
      Swal.fire({
        title: "ERROR",
        text: `${err.error.message}`,
        icon: "error"
      });
    }
  }

  exit(): void{
    this.router.navigate(['/btg/btg-initial-page/initial-page'])
  }
}
