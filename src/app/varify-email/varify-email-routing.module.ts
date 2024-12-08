import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VarifyEmailPage } from './varify-email.page';

const routes: Routes = [
  {
    path: '',
    component: VarifyEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VarifyEmailPageRoutingModule {}
