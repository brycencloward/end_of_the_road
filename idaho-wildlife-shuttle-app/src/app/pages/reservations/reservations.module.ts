import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsPageRoutingModule } from './reservations-routing.module';

import { ReservationsPage } from './reservations.page';
import { ShuttleReservationCardComponent } from 'src/app/components/shuttle-reservation-card/shuttle-reservation-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationsPageRoutingModule
  ],
  declarations: [
    ReservationsPage,
    ShuttleReservationCardComponent
  ]
})
export class ReservationsPageModule {}
