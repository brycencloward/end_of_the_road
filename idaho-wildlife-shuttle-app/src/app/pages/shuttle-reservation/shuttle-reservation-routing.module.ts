import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShuttleReservationPage } from './shuttle-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: ShuttleReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShuttleReservationPageRoutingModule {}
