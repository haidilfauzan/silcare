import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VarifyEmailPageRoutingModule } from './varify-email-routing.module';

import { VarifyEmailPage } from './varify-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VarifyEmailPageRoutingModule
  ],
  declarations: [VarifyEmailPage]
})
export class VarifyEmailPageModule {}
