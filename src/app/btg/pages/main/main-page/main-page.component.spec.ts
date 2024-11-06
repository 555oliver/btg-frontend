import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MainRoutingModule } from '../main-routing.module';


describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let router: Router;
  let userService: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']); // Crear un espía para el Router
    const mainServiceSpy = jasmine.createSpyObj('UserService', ['userById']); // Crear un espía para el servicio
    await TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      imports: [
        SharedModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MainRoutingModule,
        RouterModule.forRoot([
          { path: 'main-page', component: MainPageComponent },
        ]),

      ],
      providers: [
        UserService,
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: mainServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>; // Asegura la inyección correcta

    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should remove idUser from localStorage and navigate to login page', () => {
  //   // Simula el elemento idUser en localStorage

  //   // Llama al método logout
  //   component.logout();
  //   localStorage.setItem('idUser', '123');

  //   // Verifica que idUser se haya eliminado de localStorage
  //   expect(localStorage.removeItem('idUser')).toBeTrue();

  //   // Verifica que el método navigateByUrl fue llamado con la ruta de inicio de sesión
  //   // expect(router.navigateByUrl).toHaveBeenCalledWith('/btg/auth/login');
  // });
});
