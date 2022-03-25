import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFooterComponent } from './main-footer.component';
import { LogoutButtonModule } from '../logout-button/logout-button.module';

@NgModule({
  imports: [
    CommonModule,
    LogoutButtonModule
  ],
  exports: [
    MainFooterComponent
  ],
  declarations: [
    MainFooterComponent
  ]
})
export class MainFooterModule {}
