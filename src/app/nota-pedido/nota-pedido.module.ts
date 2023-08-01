import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaPedidoRoutingModule } from './nota-pedido-routing.module';
import { NotaPedidoNewComponent } from './components/nota-pedido-new/nota-pedido-new.component';
import { NotaPedidoComponent } from './components/nota-pedido.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FileSaverModule } from 'ngx-filesaver';
import { NotaPedidoService } from './services/nota-pedido.service';

@NgModule({
  declarations: [NotaPedidoNewComponent, NotaPedidoComponent],
  providers: [NotaPedidoService],
  imports: [
    CommonModule,
    NotaPedidoRoutingModule,
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
export class NotaPedidoModule {}
