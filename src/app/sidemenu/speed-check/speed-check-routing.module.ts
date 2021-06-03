import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpeedCheckPage } from './speed-check.page';

const routes: Routes = [
  {
    path: '',
    component: SpeedCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeedCheckPageRoutingModule {}
