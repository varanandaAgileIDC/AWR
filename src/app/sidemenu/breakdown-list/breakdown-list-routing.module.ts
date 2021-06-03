import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreakdownListPage } from './breakdown-list.page';

const routes: Routes = [
  {
    path: '',
    component: BreakdownListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreakdownListPageRoutingModule {}
