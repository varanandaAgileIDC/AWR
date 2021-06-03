import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpeedCheckPageRoutingModule } from './speed-check-routing.module';

import { SpeedCheckPage } from './speed-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeedCheckPageRoutingModule
  ],
  declarations: [SpeedCheckPage]
})
export class SpeedCheckPageModule {}
