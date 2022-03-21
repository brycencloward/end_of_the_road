import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayPalWebPageRoutingModule } from './pay-pal-web-routing.module';
import { PayPalWebPage } from './pay-pal-web.page';
import { MainFooterModule } from 'src/app/components/main-footer/main-footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPalWebPageRoutingModule,
    MainFooterModule
  ],
  declarations: [PayPalWebPage]
})
export class PayPalWebPageModule {}
