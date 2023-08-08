import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { noop, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RemitoService } from '../../services/remito.service';
import { FacturaService } from 'src/app/factura/services/factura.service';
import { Factura } from 'src/app/shared/types/Factura';
import { ClienteService } from 'src/app/cliente/services/cliente.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  remitos: any[] = [];
  facturas: any[] = [];
  idClienteRem: number = 0;
  clientes: any[] = [];
  headers: Array<string> = [
    'Nro. Remito',
    'Nro. Factura',
    'Cliente',
    'Importa',
    'Estado',
  ];

  constructor(
    private readonly remitoService: RemitoService,
    private readonly facturaService: FacturaService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router,
    private readonly clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.remitoService
      .getAll()
      .pipe(
        tap((data) => {
          this.remitos = data.map((rem) => {
            /*    this.facturaService
              .getById(rem.idcfactura)
              .pipe(
                tap((fact) => {
                  this.facturas = fact.map((fc) => {
                    const idClienteRem = fc.idCliente;
                  });
                })
              )
              .subscribe(noop);
          
            this.clienteService
              .getById(this.idClienteRem)
              .pipe(
                tap((cliente) => {
                  this.clientes = cliente.map((cl) => {
                    const nombreCliente = cl.nombreCliente;
                    return nombreCliente;c
                  });
                })
              )
              .subscribe(noop);
*/
            return {
              'Nro. Remito': rem.idremito,
              'Nro. Factura': rem.idcfactura,
              Cliente: rem.nombreCliente,
              Importa: rem.importeFinal,
              Estado: rem.estado,
            };
          });
          this.cd.detectChanges();
          console.log(this.remitos);
        })
      )
      .subscribe(noop);
  }
}
