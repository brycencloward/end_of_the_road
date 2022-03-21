import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { ErrorMessageModule } from 'src/app/components/error-message/error-message.module';
import { MainFooterModule } from 'src/app/components/main-footer/main-footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    ErrorMessageModule,
    MainFooterModule
  ],
  declarations: [
    RegisterPage
  ]
})
export class RegisterPageModule {}
