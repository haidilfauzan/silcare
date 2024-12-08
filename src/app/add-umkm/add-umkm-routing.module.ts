import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUmkmPage } from './add-umkm.page';

const routes: Routes = [
  {
    path: '',
    component: AddUmkmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUmkmPageRoutingModule {}
