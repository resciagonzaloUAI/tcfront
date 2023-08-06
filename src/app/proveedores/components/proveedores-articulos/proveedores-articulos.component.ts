import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, noop, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ArticulosService } from 'src/app/articulos/services/articulos.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { NotaPedido } from 'src/app/shared/types/NotaPedido';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from 'src/app/stock/services/stock.service';

@Component({
  selector: 'app-proveedores-articulos',
  templateUrl: './proveedores-articulos.component.html',
  styleUrls: ['./proveedores-articulos.component.scss'],
})
export class ProveedoresArticulosComponent implements OnInit {
  constructor(
    private readonly proveedoresService: ProveedoresService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}
  fileToUpload: File | null = null;
  idProveedor: number | undefined;

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap((query): void => {
          this.idProveedor = +query.get('idProveedor')!;
        })
      )
      .subscribe(noop);
  }

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
      .uploadArticles(formData, this.idProveedor!)
      .pipe(tap((res) => console.log(res)))
      .subscribe(noop);
    this.router.navigate(['/proveedores/']);
    const messagge = 'Carga correcta';
    this.snackBar.open(messagge, 'Cerrar', {
      duration: 3500,
    });
  }
}
