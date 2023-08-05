// factura-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenCompraComponent } from './components/orden-compra.component';
import { OrdenCompraNewComponent } from './components/orden-compra-new/orden-compra-new.component';

const routes: Routes = [
  { path: '', component: OrdenCompraComponent },
  { path: 'new', component: OrdenCompraNewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenCompraRoutingModule {}
