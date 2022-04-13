import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovecarPageRoutingModule } from './movecar-routing.module';

import { MovecarPage } from './movecar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovecarPageRoutingModule
  ],
  declarations: [MovecarPage]
})
export class MovecarPageModule {}
