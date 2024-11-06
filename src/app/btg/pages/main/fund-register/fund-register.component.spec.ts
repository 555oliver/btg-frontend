import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRegisterComponent } from './fund-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { UserService } from '../services/user.service';

describe('FundRegisterComponent', () => {
  let component: FundRegisterComponent;
  let fixture: ComponentFixture<FundRegisterComponent>;

  beforeEach(async () => {
    const mainServiceSpy = jasmine.createSpyObj('UserService', [
      'fundsAll',
    ]); // Crear un espía para el servicio
    await TestBed.configureTestingModule({
      declarations: [FundRegisterComponent],
      imports: [
        SharedModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,

      ],
      providers: [
        UserService,
        { provide: UserService, useValue: mainServiceSpy },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
