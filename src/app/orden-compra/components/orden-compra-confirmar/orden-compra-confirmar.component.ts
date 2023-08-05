import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { noop, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra-confirmar.component.html',
  styleUrls: ['./orden-compra-confirmar.component.scss'],
})
export class OrdenCompraComfirmarComponent implements OnInit {
  ordenescompra: any[] = [];
  headers: Array<string> = ['Id', 'Proveedor', 'Precio'];
  actions: Array<{ name: string; label: string }> = [
    { name: 'upload', label: 'Cargar Respuesta Proveedor' },
  ];

  constructor(
    private readonly ordencompraService: OrdenCompraService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.ordencompraService
      .getAll({ estado: 'PENDIENTE' })
      .pipe(
        tap((ordenescompra) => {
          this.ordenescompra = ordenescompra.map((oc) => {
            return {
              Id: oc.id,
              Proveedor: oc.proveedor.nombre,
              Precio: oc.precio,
            };
          });
          console.log(ordenescompra);

          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }

  onTableAction({ name, row }: { name: string; row: any }) {
    if (name === 'upload') {
      this.router.navigate(['/orden-compra/respuesta'], {
        queryParams: { idOrdenCompra: row.Id },
      });
    }
  }
}
