import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orden-compra-respuesta',
  templateUrl: './orden-compra-respuesta.component.html',
  styleUrls: ['./orden-compra-respuesta.component.scss'],
})
export class OrdenCompraRespuestaComponent implements OnInit {
  constructor(
    private readonly ordenCompraService: OrdenCompraService,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}
  fileToUpload: File | null = null;
  idOrdenCompra: number | undefined;
  diferencias: Array<any> = [];
  submitted: boolean = false;
  headers: Array<string> = ['Articulo', 'Pedido', 'Disponible'];

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap((query): void => {
          this.idOrdenCompra = +query.get('idOrdenCompra')!;
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

    this.ordenCompraService
      .uploadRespuesta(formData, this.idOrdenCompra!)
      .pipe(
        tap((res) => {
          this.submitted = true;
          console.log(res);
          this.diferencias = res.map((r: any) => {
            return {
              Articulo: r.articleName,
              Pedido: r.requested,
              Disponible: r.available,
            };
          });
        })
      )
      .subscribe(noop);
  }

  confirmarOrdenCompra(confirm: boolean) {
    this.ordenCompraService
      .confirmarOrdenCompra(this.idOrdenCompra!, confirm)
      .pipe(
        tap((res) => {
          const action = confirm ? 'aceptada' : 'cancelada';
          const message = `La orden de compra ha sido ${action} correctamente.`;
          this.snackBar.open(message, 'Cerrar', {
            duration: 3500,
          });
          this.router.navigate(['/orden-compra/confirmar']);
        })
      )
      .subscribe(noop);
  }
}
