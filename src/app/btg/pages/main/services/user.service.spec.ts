import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ResponseLogin } from '../../auth/services/interface/response';
import { ResponseFunds, ResponseTransactions } from './interfaces/response';
import { BodyTransactions } from './interfaces/body-transactions';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify(); // Verificar que no queden solicitudes pendientes
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user by id', () => {
    const mockUserId = '12345';
    const mockResponse: ResponseLogin = {
      _id: '6717c4a436622e24fd21256d',
      nombre_usuario: 'oliver123',
      correo: 'oliver.charry@example.com',
      monto: 2000000,
      password: '$2a$10$cMOhHe3e2wxJzs1sDQ.x9OnWKy9KBlr6ke3R5LAWBC.ocUWvcjxSm',
      fondos: ['6717c4a436622e24fd21256d'],
      __v: 0,
    };
    service.userById(mockUserId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(
      `${service['urlUser']}/${mockUserId}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should createUser', () => {
    const mockResponse: ResponseLogin = {
      _id: '6717c4a436622e24fd21256d',
      nombre_usuario: 'oliver123',
      correo: 'oliver.charry@example.com',
      monto: 2000000,
      password: '$2a$10$cMOhHe3e2wxJzs1sDQ.x9OnWKy9KBlr6ke3R5LAWBC.ocUWvcjxSm',
      fondos: ['6717c4a436622e24fd21256d'],
      __v: 0,
    };
    const body = {
      nombre_usuario: 'lorena123',
      correo: 'lorena.charrss10@example.com',
      password: '1037641216lore',
      monto: 4000000,
      fondos: [],
    };
    service.createUser(body).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(`${service['urlUser']}`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should updateUser', () => {
    const mockUserId = '12345';
    const mockResponse: ResponseLogin = {
      _id: '6717c4a436622e24fd21256d',
      nombre_usuario: 'oliver123',
      correo: 'oliver.charry@example.com',
      monto: 2000000,
      password: '$2a$10$cMOhHe3e2wxJzs1sDQ.x9OnWKy9KBlr6ke3R5LAWBC.ocUWvcjxSm',
      fondos: ['6717c4a436622e24fd21256d'],
      __v: 0,
    };
    const body = {
      nombre_usuario: 'lorena123',
      correo: 'lorena.charrss10@example.com',
      password: '1037641216lore',
      monto: 4000000,
      fondos: [],
    };
    service.userUpdate(mockUserId, body).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(
      `${service['urlUser']}/${mockUserId}`
    );
    expect(req.request.method).toEqual('PATCH');
  });

  it('should retrieve user by id', () => {
    const mockUserId = '12345';
    const mockResponse: ResponseFunds = {
      _id: '671699f3f0d5a63e7946f81b',
      nombre_fondo: 'fpv_btg_pactual_dinamica',
      monto_minimo: 100000,
      estado: 'activo',
      categoria_fondo: 'FPV',
      __v: 0,
    };
    service.fundsById(mockUserId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(
      `${service['urlFunds']}/${mockUserId}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should createUser', () => {
    const mockResponse: ResponseTransactions = {
      _id: '6719417f21c21533d71e8072',
      saldo: 90000,
      tipo_accion: 'Apertura',
      fondo: {
        _id: '671699c8f0d5a63e7946f817',
        nombre_fondo: 'deudaprivada',
        monto_minimo: 50000,
        estado: 'activo',
        categoria_fondo: 'FIC',
        __v: 0,
      },
      usuario: {
        _id: '671833b346806b94e490faa6',
        nombre_usuario: 'lorena123',
        correo: 'lorena.charry10@example.com',
        monto: 4000000,
        password:
          '$2a$10$2ZN1RrZ9EVUQHeAKT98snO/aYzdaE8YrxuipvfRv8hbGOQiWC0WeO',
        fondos: ['671699c8f0d5a63e7946f817', '671699f3f0d5a63e7946f81b'],
        __v: 0,
      },
      fecha_creacion: '2024-10-23T18:33:35.916Z',
      __v: 0,
    };
    const body: BodyTransactions = {
      saldo: 90000,
      tipo_accion: 'Apertura',
      fondo: '671699c8f0d5a63e7946f817',
      usuario: '671833b346806b94e490faa6',
    };
    service.createTransactions(body).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(
      `${service['urlTransactions']}`
    );
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should updateTransactions', () => {
    const mockUserId = '12345';
    const mockResponse: ResponseTransactions = {
      _id: '6719417f21c21533d71e8072',
      saldo: 90000,
      tipo_accion: 'Apertura',
      fondo: {
        _id: '671699c8f0d5a63e7946f817',
        nombre_fondo: 'deudaprivada',
        monto_minimo: 50000,
        estado: 'activo',
        categoria_fondo: 'FIC',
        __v: 0,
      },
      usuario: {
        _id: '671833b346806b94e490faa6',
        nombre_usuario: 'lorena123',
        correo: 'lorena.charry10@example.com',
        monto: 4000000,
        password:
          '$2a$10$2ZN1RrZ9EVUQHeAKT98snO/aYzdaE8YrxuipvfRv8hbGOQiWC0WeO',
        fondos: ['671699c8f0d5a63e7946f817', '671699f3f0d5a63e7946f81b'],
        __v: 0,
      },
      fecha_creacion: '2024-10-23T18:33:35.916Z',
      __v: 0,
    };
    const body: BodyTransactions = {
      saldo: 90000,
      tipo_accion: 'Apertura',
      fondo: '671699c8f0d5a63e7946f817',
      usuario: '671833b346806b94e490faa6',
    };
    service.updateTransactions(body, mockUserId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(
      `${service['urlTransactions']}/${mockUserId}`
    );
    expect(req.request.method).toEqual('PATCH');
    req.flush(mockResponse);
  });

  it('should retrieve all funds', () => {
    const mockResponse: ResponseFunds[] = [
      {
        _id: '671699f3f0d5a63e7946f81b',
        nombre_fondo: 'fpv_btg_pactual_dinamica',
        monto_minimo: 100000,
        estado: 'activo',
        categoria_fondo: 'FPV',
        __v: 0,
      },
    ];

    // Llamar al método fundsAll
    service.fundsAll().subscribe((response) => {
      // Verificar que la respuesta sea la esperada
      expect(response).toEqual(mockResponse);
    });

    // Simular la solicitud HTTP GET
    const req = httpTestingController.expectOne(service['urlFunds']);
    expect(req.request.method).toEqual('GET');

    // Responder con el mockResponse
    req.flush(mockResponse);
  });

  it('should retrieve all funds', () => {
    const mockResponse: ResponseTransactions[] = [
      {
        _id: '6719417f21c21533d71e8072',
        saldo: 90000,
        tipo_accion: 'Apertura',
        fondo: {
          _id: '671699c8f0d5a63e7946f817',
          nombre_fondo: 'deudaprivada',
          monto_minimo: 50000,
          estado: 'activo',
          categoria_fondo: 'FIC',
          __v: 0,
        },
        usuario: {
          _id: '671833b346806b94e490faa6',
          nombre_usuario: 'lorena123',
          correo: 'lorena.charry10@example.com',
          monto: 4000000,
          password:
            '$2a$10$2ZN1RrZ9EVUQHeAKT98snO/aYzdaE8YrxuipvfRv8hbGOQiWC0WeO',
          fondos: ['671699c8f0d5a63e7946f817', '671699f3f0d5a63e7946f81b'],
          __v: 0,
        },
        fecha_creacion: '2024-10-23T18:33:35.916Z',
        __v: 0,
      },
    ];

    // Llamar al método fundsAll
    service.allTransactions().subscribe((response) => {
      // Verificar que la respuesta sea la esperada
      expect(response).toEqual(mockResponse);
    });

    // Simular la solicitud HTTP GET
    const req = httpTestingController.expectOne(service['urlTransactions']);
    expect(req.request.method).toEqual('GET');

    // Responder con el mockResponse
    req.flush(mockResponse);
  });
});
