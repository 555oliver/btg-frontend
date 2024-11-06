import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';

const routes: Routes = [
  {
    path: 'initial-page',
    component: InitialPageComponent
  },
  {
    path: '**',
    redirectTo: 'initial-page'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialPageRoutingModule { }
