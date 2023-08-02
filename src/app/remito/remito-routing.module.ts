// cliente-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemitoComponent } from './components/remito.component';
import { ListadoComponent } from './components/listado/listado.component';

const routes: Routes = [
  { path: '', component: RemitoComponent },
  { path: 'listado', component: ListadoComponent },
  // more routes related to 'cliente' can go here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemitoRoutingModule {}
