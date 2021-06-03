import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentScanPageRoutingModule } from './document-scan-routing.module';

import { DocumentScanPage } from './document-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentScanPageRoutingModule
  ],
  declarations: [DocumentScanPage]
})
export class DocumentScanPageModule {}
