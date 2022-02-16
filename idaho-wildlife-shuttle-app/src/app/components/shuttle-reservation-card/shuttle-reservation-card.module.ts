import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { ShuttleReservationCardComponent } from './shuttle-reservation-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ShuttleReservationCardComponent
  ],
  declarations: [
    ShuttleReservationCardComponent
  ]
})
export class ShuttleReservationCardModule {}
