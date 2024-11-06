import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { OpeningsComponent } from './openings/openings.component';
import { GeneralHistoryComponent } from './general-history/general-history.component';
import { FundRegisterComponent } from './fund-register/fund-register.component';
import { CancellationsComponent } from './cancellations/cancellations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitialComponent } from './initial/initial.component';


@NgModule({
  declarations: [MainPageComponent, OpeningsComponent, GeneralHistoryComponent, FundRegisterComponent, CancellationsComponent, InitialComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService]
})
export class MainModule { }
