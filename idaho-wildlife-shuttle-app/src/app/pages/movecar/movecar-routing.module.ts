import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovecarPage } from './movecar.page';

const routes: Routes = [
  {
    path: '',
    component: MovecarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovecarPageRoutingModule {}
