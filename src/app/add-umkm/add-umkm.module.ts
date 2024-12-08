import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUmkmPageRoutingModule } from './add-umkm-routing.module';

import { AddUmkmPage } from './add-umkm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddUmkmPageRoutingModule
  ],
  declarations: [AddUmkmPage]
})
export class AddUmkmPageModule {}
