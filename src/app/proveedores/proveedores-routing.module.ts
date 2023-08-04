// factura-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './components/proveedores.component';
import { ProveedoresArticulosComponent } from './components/proveedores-articulos/proveedores-articulos.component';

const routes: Routes = [
  { path: '', component: ProveedoresComponent },
  { path: 'articulos', component: ProveedoresArticulosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedoresRoutingModule {}
