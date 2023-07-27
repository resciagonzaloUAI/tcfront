// stock-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenComponent } from './components/almacen.component';

const routes: Routes = [
  { path: '', component: AlmacenComponent },
  // more routes related to 'stock' can go here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlmacenRoutingModule {}
