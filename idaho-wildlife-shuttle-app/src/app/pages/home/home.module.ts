import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ShuttleReservationCardModule } from 'src/app/components/shuttle-reservation-card/shuttle-reservation-card.module';
import { MainFooterModule } from 'src/app/components/main-footer/main-footer.module';
import { LogoutButtonModule } from 'src/app/components/logout-button/logout-button.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ShuttleReservationCardModule,
    MainFooterModule,
    LogoutButtonModule
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule {}
