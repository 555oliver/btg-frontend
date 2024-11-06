import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPageComponent } from './initial-page.component';
import { SharedModule } from '../../../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('InitialPageComponent', () => {
  let component: InitialPageComponent;
  let fixture: ComponentFixture<InitialPageComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialPageComponent],
      imports: [
        SharedModule,
        RouterModule,
        TestBed.configureTestingModule({
          imports: [
            RouterModule.forRoot([
              { path: 'initial-page', component: InitialPageComponent },
            ]),
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InitialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);  //
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /btg/auth/login when actionBtn is called', () => {
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    component.actionBtn();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/btg/auth/login');
  });
});
