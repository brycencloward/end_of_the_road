import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShuttleReservationPageRoutingModule } from './shuttle-reservation-routing.module';
import { ShuttleReservationPage } from './shuttle-reservation.page';
import { ShuttleReservationCardComponent } from 'src/app/components/shuttle-reservation-card/shuttle-reservation-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShuttleReservationPageRoutingModule,
    ShuttleReservationCardComponent
  ],
  declarations: [
    ShuttleReservationPage
  ]
})
export class ShuttleReservationPageModule {}
