import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerVehiclesPageRoutingModule } from './customer-vehicles-routing.module';

import { CustomerVehiclesPage } from './customer-vehicles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerVehiclesPageRoutingModule
  ],
  declarations: [CustomerVehiclesPage]
})
export class CustomerVehiclesPageModule {}
