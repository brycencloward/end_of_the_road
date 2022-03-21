import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReservationsPageRoutingModule } from './reservations-routing.module';
import { ReservationsPage } from './reservations.page';
import { ShuttleReservationCardModule } from 'src/app/components/shuttle-reservation-card/shuttle-reservation-card.module';
import { MainFooterModule } from 'src/app/components/main-footer/main-footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationsPageRoutingModule,
    ShuttleReservationCardModule,
    MainFooterModule
  ],
  declarations: [
    ReservationsPage
  ]
})
export class ReservationsPageModule {}
