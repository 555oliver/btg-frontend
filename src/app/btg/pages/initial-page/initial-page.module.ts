import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialPageRoutingModule } from './initial-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [InitialPageComponent],
  imports: [CommonModule, InitialPageRoutingModule, SharedModule, RouterModule],
})
export class InitialPageModule {}
