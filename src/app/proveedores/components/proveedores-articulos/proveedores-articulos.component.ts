import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, noop, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ArticulosService } from 'src/app/articulos/services/articulos.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { NotaPedido } from 'src/app/shared/types/NotaPedido';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StockService } from 'src/app/stock/services/stock.service';

@Component({
  selector: 'app-proveedores-articulos',
  templateUrl: './proveedores-articulos.component.html',
  styleUrls: ['./proveedores-articulos.component.scss'],
})
export class ProveedoresArticulosComponent {
  constructor(private readonly proveedoresService: ProveedoresService) {}
  fileToUpload: File | null = null;

  onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.fileToUpload = fileList[0];
    }
  }

  onSubmit() {
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload!, this.fileToUpload?.name);

    this.proveedoresService
      .uploadArticles(formData)
      .pipe(tap((res) => console.log(res)))
      .subscribe(noop);
  }
}
