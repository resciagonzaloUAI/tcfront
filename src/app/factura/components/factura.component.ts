import {
  ChangeDetectorRef,
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
} from '@angular/core';
import { FacturaService } from '../services/factura.service';
import { noop, tap } from 'rxjs';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaComponent implements OnInit {
  facturas: any[] = [];
  headers: Array<string> = ['Nro. Factura', 'Cliente', 'Precio', 'Fecha'];
  actions: Array<{ name: string; label: string }> = [
    { name: 'download', label: 'Descargar' },
  ];

  constructor(
    private readonly facturaService: FacturaService,
    private readonly cd: ChangeDetectorRef,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.facturaService
      .getAll()
      .pipe(
        tap((facturas) => {
          this.facturas = facturas.map((fact) => {
            return {
              'Nro. Factura': fact.idbfactura,
              Cliente: fact.nombreCliente,
              Precio: '$ ' + fact.precio,
              Fecha: formatDate(
                fact?.createdAt!,
                'yyyy-MM-dd HH:mm',
                this.locale
              ),
            };
          });
          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }

  onTableAction({ name, row }: { name: string; row: any }) {
    console.log('asd');

    if (name === 'download') {
      this.facturaService.download(row['Nro. Factura']).subscribe(noop);
    }
  }
}
