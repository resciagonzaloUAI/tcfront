// factura-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaComponent } from './components/factura.component';
import { FacturaNewComponent } from './components/factura-new/factura-new.component';

const routes: Routes = [
  { path: '', component: FacturaComponent },
  { path: 'new', component: FacturaNewComponent },
  // more routes related to 'factura' can go here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturaRoutingModule {}
