import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralHistoryComponent } from './general-history.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GeneralHistoryComponent', () => {
  let component: GeneralHistoryComponent;
  let fixture: ComponentFixture<GeneralHistoryComponent>;
  let userService: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    const mainServiceSpy = jasmine.createSpyObj('UserService', [
      'allTransactions',
    ]); // Crear un espía para el servicio
    await TestBed.configureTestingModule({
      declarations: [GeneralHistoryComponent],
      imports: [
        SharedModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        UserService,
        { provide: UserService, useValue: mainServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralHistoryComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>; // Asegura la inyección correcta
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter transactions based on user ID', () => {
    const mockTransactions: any[] = [
      { usuario: { _id: '123' }, amount: 100 },
      { usuario: { _id: '456' }, amount: 200 },
    ];

    const userId = '123';
    localStorage.setItem('idUser', userId);
    userService.allTransactions.and.returnValue(of(mockTransactions));

    component.transactionsAlls();

    expect(userService.allTransactions).toHaveBeenCalled();
    expect(component.transactions.length).toBe(1);
    expect(component.transactions[0].usuario._id).toBe(userId);

    localStorage.removeItem('idUser'); // Limpia localStorage al final de la prueba
  });
});
