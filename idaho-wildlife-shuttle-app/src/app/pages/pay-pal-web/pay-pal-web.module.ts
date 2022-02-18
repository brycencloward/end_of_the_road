import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayPalWebPageRoutingModule } from './pay-pal-web-routing.module';

import { PayPalWebPage } from './pay-pal-web.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPalWebPageRoutingModule
  ],
  declarations: [PayPalWebPage]
})
export class PayPalWebPageModule {}
