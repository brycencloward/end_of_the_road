import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ShuttleReservationCardModule } from 'src/app/components/shuttle-reservation-card/shuttle-reservation-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ShuttleReservationCardModule
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule {}
