// factura-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenCompraComponent } from './components/orden-compra.component';
import { OrdenCompraNewComponent } from './components/orden-compra-new/orden-compra-new.component';
import { OrdenCompraRespuestaComponent } from './components/orden-compra-respuesta/orden-compra-respuesta.component';
import { OrdenCompraComfirmarComponent } from './components/orden-compra-confirmar/orden-compra-confirmar.component';

const routes: Routes = [
  { path: '', component: OrdenCompraComponent },
  { path: 'new', component: OrdenCompraNewComponent },
  { path: 'respuesta', component: OrdenCompraRespuestaComponent },
  { path: 'confirmar', component: OrdenCompraComfirmarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenCompraRoutingModule {}
