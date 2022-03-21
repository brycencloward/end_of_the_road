import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CancelpolicyPageRoutingModule } from './cancelpolicy-routing.module';
import { CancelpolicyPage } from './cancelpolicy.page';
import { MainFooterModule } from 'src/app/components/main-footer/main-footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelpolicyPageRoutingModule,
    MainFooterModule
  ],
  declarations: [CancelpolicyPage]
})
export class CancelpolicyPageModule {}
