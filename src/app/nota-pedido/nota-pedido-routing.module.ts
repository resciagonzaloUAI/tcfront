// factura-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotaPedidoComponent } from './components/nota-pedido.component';
import { NotaPedidoNewComponent } from './components/nota-pedido-new/nota-pedido-new.component';

const routes: Routes = [
  { path: '', component: NotaPedidoComponent },
  { path: 'new', component: NotaPedidoNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaPedidoRoutingModule {}
