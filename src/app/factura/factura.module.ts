import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaRoutingModule } from './factura-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FacturaService } from './services/factura.service';
import { FacturaNewComponent } from './components/factura-new/factura-new.component';
import { FacturaComponent } from './components/factura.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileSaverModule } from 'ngx-filesaver';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [FacturaNewComponent, FacturaComponent],
  providers: [FacturaService],
  imports: [
    CommonModule,
    FacturaRoutingModule,
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
export class FacturaModule {}
