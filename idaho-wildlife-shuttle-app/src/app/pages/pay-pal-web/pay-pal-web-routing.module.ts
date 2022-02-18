import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayPalWebPage } from './pay-pal-web.page';

const routes: Routes = [
  {
    path: '',
    component: PayPalWebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayPalWebPageRoutingModule {}
