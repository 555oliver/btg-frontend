import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthRoutingModule } from '../auth-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../main/services/user.service';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Login } from '../services/interface/login';
import Swal from 'sweetalert2';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        TestBed.configureTestingModule({
          imports: [
            RouterModule.forRoot([
              { path: 'login', component: LoginComponent },
            ]),
          ],
        }),
      ],
      providers: [
        AuthService,
        UserService,
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /btg/auth/register when register() is called', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.register();
    expect(navigateSpy).toHaveBeenCalledWith('/btg/auth/register');
  });

  it('should call nextResponde on successful login', () => {
    const mockResponse = {
      _id: '6717c4a436622e24fd21256d',
      nombre_usuario: 'oliver123',
      correo: 'oliver.charry@example.com',
      monto: 2000000,
      password: '$2a$10$cMOhHe3e2wxJzs1sDQ.x9OnWKy9KBlr6ke3R5LAWBC.ocUWvcjxSm',
      fondos: ['6717c4a436622e24fd21256d'],
      __v: 0,
    }; 
    authServiceSpy.login.and.returnValue(of(mockResponse)); 
    spyOn(component, 'nextResponde');
    const loginData: Login = { correo: 'test', password: 'password' }; 
    component.login(loginData);
    expect(component.nextResponde).toHaveBeenCalledWith(mockResponse);
  });
  it('should call errorResponse on login error', () => {
    const mockError = { message: 'Login failed' };  
    authServiceSpy.login.and.returnValue(throwError(mockError));  
    spyOn(component, 'errorResponse');
    const loginData: Login = { correo: 'test', password: 'password' };  
    component.login(loginData);
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
    component.nextResponde(mockResponse);
    expect(navigateSpy).toHaveBeenCalledWith(['/btg/main/main-page/initial']);
  });

  it('should show Swal alert on valid error', () => {
    const swalSpy = spyOn(Swal, 'fire').and.stub();  
    const mockError = { error: { message: 'An error occurred' } };
    component.errorResponse(mockError);
    expect(swalSpy).toBeDefined();
  });
});
