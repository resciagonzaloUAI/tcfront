import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form-dialog.component.html',
  styleUrls: ['./generic-form-dialog.component.scss'],
})
export class GenericFormDialogComponent {
  form: FormGroup;
  actionType: string = '';

  constructor(
    private dialogRef: MatDialogRef<GenericFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({});
    this.actionType = data.rowData.actionType;
    console.log(data);

    data.formConfig.forEach(
      (field: { required: any; name: any; value: any }) => {
        if (field.required) {
          this.form.addControl(
            field.name,
            new FormControl(field.value || '', Validators.required)
          );
        } else {
          this.form.addControl(field.name, new FormControl(''));
        }
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.form.getRawValue(),
        actionType: this.actionType,
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
