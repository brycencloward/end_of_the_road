import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
      ErrorMessageComponent
  ],
  declarations: [
    ErrorMessageComponent
  ]
})
export class ErrorMessageModule {}
