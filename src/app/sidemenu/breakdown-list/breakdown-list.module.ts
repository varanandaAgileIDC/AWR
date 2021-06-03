import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreakdownListPageRoutingModule } from './breakdown-list-routing.module';

import { BreakdownListPage } from './breakdown-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreakdownListPageRoutingModule
  ],
  declarations: [BreakdownListPage]
})
export class BreakdownListPageModule {}
