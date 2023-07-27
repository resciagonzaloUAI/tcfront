// factura-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotaPedidoComponent } from './components/nota-pedido.component';

const routes: Routes = [
  { path: '', component: NotaPedidoComponent },
  //   { path: 'new', component: NotaPedidoNewComponent },
  // more routes related to 'factura' can go here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaPedidoRoutingModule {}
