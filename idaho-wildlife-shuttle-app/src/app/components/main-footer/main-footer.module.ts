import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFooterComponent } from './main-footer.component';
import { LogoutButtonModule } from '../logout-button/logout-button.module';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { DeleteUserModule } from '../delete-user/delete-user.module';

@NgModule({
  imports: [
    CommonModule,
    LogoutButtonModule,
    DeleteUserModule
  ],
  exports: [
    MainFooterComponent
  ],
  declarations: [
    MainFooterComponent
  ]
})
export class MainFooterModule {}
