import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './components/table/table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDirective } from './directives/confirm.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm/confirm-dialog.component';
import { GenericFormComponent } from './components/generic-form/components/generic-form.component';
import { GenericFormDialogComponent } from './components/generic-form-dialog.component.ts/generic-form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    TableComponent,
    ConfirmDirective,
    ConfirmDialogComponent,
    GenericFormComponent,
    GenericFormDialogComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [TableComponent, GenericFormComponent],
})
export class SharedModule {}
