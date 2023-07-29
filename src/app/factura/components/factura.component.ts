import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FacturaService } from '../services/factura.service';
import { ActivatedRoute } from '@angular/router';
import { noop, tap } from 'rxjs';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaComponent implements OnInit {
  facturas: any[] = [];
  headers: Array<string> = ['Nro. Factura', 'Nro. Pedido', 'Precio'];
  actions: Array<{ name: string; label: string }> = [
    { name: 'download', label: 'Descargar' },
  ];

  constructor(
    private readonly facturaService: FacturaService,
    private readonly cd: ChangeDetectorRef,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    console.log('entro.,,,,,');

    this.facturaService
      .getAll()
      .pipe(
        tap((facturas) => {
          console.log(facturas);

          this.facturas = facturas.map((fact) => {
            return {
              'Nro. Factura': fact.idbfactura,
              'Nro. Pedido': fact.idpedido,
              Precio: fact.precio,
            };
          });
          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }
  /*
  onTableAction({ name, row }: { name: string; row: any }) {
    if (name === 'edit') {
      // Handle edit
    } else if (name === 'delete') {
      this.articuloService
        .delete(row['Nro. Articulo'])
        .pipe(
          tap(() => {
            this.getData();
          })
        )
        .subscribe(noop);
    }
  }*/
}
