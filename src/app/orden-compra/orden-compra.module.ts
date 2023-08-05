import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenCompraNewComponent } from './components/orden-compra-new/orden-compra-new.component';
import { OrdenCompraComponent } from './components/orden-compra.component';
import { OrdenCompraRoutingModule } from './orden-compra-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FileSaverModule } from 'ngx-filesaver';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';
import { OrdenCompraRespuestaComponent } from './components/orden-compra-respuesta/orden-compra-respuesta.component';
import { OrdenCompraComfirmarComponent } from './components/orden-compra-confirmar/orden-compra-confirmar.component';

@NgModule({
  declarations: [
    OrdenCompraNewComponent,
    OrdenCompraComponent,
    OrdenCompraRespuestaComponent,
    OrdenCompraComfirmarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FileSaverModule,
    MatSnackBarModule,
    OrdenCompraRoutingModule,
  ],
})
export class OrdenCompraModule {}
