import { Component } from '@angular/core';

@Component({
  selector: 'app-nota-pedido',
  templateUrl: './nota-pedido.component.html',
  styleUrls: ['./nota-pedido.component.scss'],
})
export class NotaPedidoComponent {
  formFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'text', required: false },
  ];

  handleFormData(formData: any) {
    console.log(formData);
  }
}
