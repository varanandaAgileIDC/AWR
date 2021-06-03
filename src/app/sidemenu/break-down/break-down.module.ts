import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreakDownPageRoutingModule } from './break-down-routing.module';

import { BreakDownPage } from './break-down.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreakDownPageRoutingModule
  ],
  declarations: [BreakDownPage]
})
export class BreakDownPageModule {}
