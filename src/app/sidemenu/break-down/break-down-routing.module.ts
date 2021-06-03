import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreakDownPage } from './break-down.page';

const routes: Routes = [
  {
    path: '',
    component: BreakDownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreakDownPageRoutingModule {}
