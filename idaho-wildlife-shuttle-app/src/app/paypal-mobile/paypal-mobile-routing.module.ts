import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaypalPage } from './paypal-mobile.page';

const routes: Routes = [
  {
    path: '',
    component: PaypalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaypalMobilePageRoutingModule {}
