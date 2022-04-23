import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccountPageRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';
import { MainFooterModule } from 'src/app/components/main-footer/main-footer.module';
import { ErrorMessageModule } from 'src/app/components/error-message/error-message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AccountPageRoutingModule,
    MainFooterModule,
    ErrorMessageModule
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
