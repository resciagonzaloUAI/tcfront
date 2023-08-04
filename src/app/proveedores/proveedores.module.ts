import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresArticulosComponent } from './components/proveedores-articulos/proveedores-articulos.component';
import { ProveedoresComponent } from './components/proveedores.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FileSaverModule } from 'ngx-filesaver';
import { ProveedoresService } from './services/proveedores.service';

@NgModule({
  declarations: [ProveedoresArticulosComponent, ProveedoresComponent],
  providers: [ProveedoresService],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
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
  ],
})
export class ProveedoresModule {}
