import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMyproductPage } from './add-myproduct.page';

const routes: Routes = [
  {
    path: '',
    component: AddMyproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMyproductPageRoutingModule {}
