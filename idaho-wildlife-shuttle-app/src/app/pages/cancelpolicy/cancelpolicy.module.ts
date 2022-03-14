import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelpolicyPageRoutingModule } from './cancelpolicy-routing.module';

import { CancelpolicyPage } from './cancelpolicy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelpolicyPageRoutingModule
  ],
  declarations: [CancelpolicyPage]
})
export class CancelpolicyPageModule {}
