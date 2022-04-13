import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaypalMobilePageRoutingModule } from './paypal-mobile-routing.module';
import { PaypalPage } from './paypal-mobile.page';
import { MainFooterModule } from 'src/app/components/main-footer/main-footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaypalMobilePageRoutingModule,
    MainFooterModule
  ],
  declarations: [PaypalPage]
})
export class PaypalMobilePageModule {}
