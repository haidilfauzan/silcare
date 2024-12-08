import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMyproductPageRoutingModule } from './add-myproduct-routing.module';

import { AddMyproductPage } from './add-myproduct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMyproductPageRoutingModule
  ],
  declarations: [AddMyproductPage]
})
export class AddMyproductPageModule {}
