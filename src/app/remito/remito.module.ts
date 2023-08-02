import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemitoRoutingModule } from './remito-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListadoComponent } from './components/listado/listado.component';
import { SharedModule } from '../shared/shared.module';
import { RemitoComponent } from './components/remito.component';

@NgModule({
  declarations: [ListadoComponent],
  imports: [CommonModule, RemitoRoutingModule, MatSnackBarModule, SharedModule],
})
export class RemitoModule {}
