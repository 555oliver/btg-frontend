import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Login } from './interface/login';
import { ResponseLogin } from './interface/response';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify(); 
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call http.post and save idUser in localStorage', () => {
    // Datos de prueba
    const mockLogin: Login = {
      correo: 'test@example.com',
      password: 'password123',
    };
    const mockResponse: ResponseLogin = {
      _id: '6717c4a436622e24fd21256d',
      nombre_usuario: 'oliver123',
      correo: 'oliver.charry@example.com',
      monto: 2000000,
      password: '$2a$10$cMOhHe3e2wxJzs1sDQ.x9OnWKy9KBlr6ke3R5LAWBC.ocUWvcjxSm',
      fondos: ['6717c4a436622e24fd21256d'],
      __v: 0,
    };
    const localStorageSpy = spyOn(localStorage, 'setItem');
    service.login(mockLogin).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(localStorageSpy).toHaveBeenCalledWith('idUser', mockResponse._id);
    });
    const req = httpTestingController.expectOne(service['urlLogin']);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });
});
