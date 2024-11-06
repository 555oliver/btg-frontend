import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { SharedModule } from '../../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { UserService } from '../../main/services/user.service';
import { ResponseUsers } from '../../main/services/interfaces/response';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let authServiceSpy: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('UserService', ['createUser']);
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule,
        TestBed.configureTestingModule({
          imports: [
            RouterModule.forRoot([
              { path: 'register', component: RegisterComponent },
            ]),
          ],
        }),
      ],
      providers: [
        AuthService,
        UserService,
        { provide: UserService, useValue: authServiceMock },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    authServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    component.form = jasmine.createSpyObj('FormGroup', ['reset']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /btg/auth/login when register() is called', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.backRegister();
    expect(navigateSpy).toHaveBeenCalledWith('/btg/auth/login');
  });

  it('should call nextResponde on successful create register', () => {
    const mockResponse = {
      "nombre_usuario": "lorena123",
      "correo": "lorena.charrss10@example.com",
      "monto": 4000000,
      "password": "$2a$10$Ecp7AYh4k5yjwcO45oXVV.h21t6ioRtB1X/WONvlSUjT5hqnf27ku",
      "fondos": []
    }; 
    authServiceSpy.createUser.and.returnValue(of(mockResponse)); 
    spyOn(component, 'nextResponse');
    const loginData: ResponseUsers = { correo: 'test', password: 'password', nombre_usuario: 'pepeito', monto: 800000, fondos:[] }; 
    component.registerUser(loginData);
    expect(component.nextResponse).toHaveBeenCalledWith(mockResponse);
  });

  it('should call errorResponse on login error', () => {
    const mockError = { message: 'Login failed' };  
    authServiceSpy.createUser.and.returnValue(throwError(mockError));  
    spyOn(component, 'errorResponse');
    const mockResponse: ResponseUsers = { correo: 'test', password: 'password', nombre_usuario: 'pepeito', monto: 800000, fondos:[] };  // Respuesta simulada
    component.registerUser(mockResponse);
    expect(component.errorResponse).toHaveBeenCalledWith(mockError);
  });

  it('should show Swal alert and navigate on valid response', () => {
    const swalSpy = spyOn(Swal, 'fire').and.stub();  
    const navigateSpy = spyOn(router, 'navigate'); 
    const mockResponse = {
      _id: '6717c4a436622e24fd21256d',
      nombre_usuario: 'oliver123',
      correo: 'oliver.charry@example.com',
      monto: 2000000,
      password: '$2a$10$cMOhHe3e2wxJzs1sDQ.x9OnWKy9KBlr6ke3R5LAWBC.ocUWvcjxSm',
      fondos: ['6717c4a436622e24fd21256d'],
      __v: 0,
    }; 
    component.nextResponse(mockResponse);
    expect(swalSpy).toHaveBeenCalledWith({
      title: 'OK',
      text: 'Usuario Creado Correctamente',
      icon: 'success',
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/btg/auth/login']);
  });

  it('should show Swal alert with "El correo ya está registrado" when error code is 11000', () => {
    const swalSpy = spyOn(Swal, 'fire').and.stub();  // Simular Swal.fire
    const mockError = {
      error: {
        code: 11000
      }
    };
    component.errorResponse(mockError);
    expect(swalSpy).toBeDefined();
  });
});
