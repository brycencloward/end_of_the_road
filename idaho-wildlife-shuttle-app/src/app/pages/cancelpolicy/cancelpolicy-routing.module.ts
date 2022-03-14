import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelpolicyPage } from './cancelpolicy.page';

const routes: Routes = [
  {
    path: '',
    component: CancelpolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelpolicyPageRoutingModule {}
