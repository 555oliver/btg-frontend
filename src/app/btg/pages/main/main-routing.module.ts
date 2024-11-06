import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { FundRegisterComponent } from './fund-register/fund-register.component';
import { OpeningsComponent } from './openings/openings.component';
import { CancellationsComponent } from './cancellations/cancellations.component';
import { GeneralHistoryComponent } from './general-history/general-history.component';
import { InitialComponent } from './initial/initial.component';

const routes: Routes = [
  {
    path: 'main-page',
    component: MainPageComponent,
    children: [
      {
        path: 'initial',
        component: InitialComponent
      },
      {
        path: 'fund-register',
        component: FundRegisterComponent
      },
      {
        path: 'openings',
        component: OpeningsComponent
      },
      {
        path: 'cancellations',
        component: CancellationsComponent
      },
      {
        path: 'general-history',
        component: GeneralHistoryComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
