import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentScanPage } from './document-scan.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentScanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentScanPageRoutingModule {}
