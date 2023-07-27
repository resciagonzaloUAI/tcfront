import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent {
  @Input() formConfig: any = []; // to receive form configuration

  // event to send form data to parent
  @Output() formData: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  constructor() {
    // initiate form
    this.form = new FormGroup({});

    this.formConfig.forEach((field: { required: any; name: any }) => {
      if (field.required) {
        // add required field
        this.form.addControl(
          field.name,
          new FormControl('', Validators.required)
        );
      } else {
        // add optional field
        this.form.addControl(field.name, new FormControl(''));
      }
    });
  }

  onSubmit() {
    // send form data to parent
    this.formData.emit(this.form.value);
  }
}
