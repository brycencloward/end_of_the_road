import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShuttleReservationPageRoutingModule } from './shuttle-reservation-routing.module';
import { ShuttleReservationPage } from './shuttle-reservation.page';
import { MainFooterModule } from 'src/app/components/main-footer/main-footer.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShuttleReservationPageRoutingModule,
    MainFooterModule
  ],
  declarations: [ShuttleReservationPage]
})
export class ShuttleReservationPageModule {}
