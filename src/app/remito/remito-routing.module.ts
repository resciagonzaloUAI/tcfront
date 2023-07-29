// cliente-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemitoComponent } from './components/remito.component';

const routes: Routes = [
  { path: '', component: RemitoComponent },
  // more routes related to 'cliente' can go here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemitoRoutingModule {}
