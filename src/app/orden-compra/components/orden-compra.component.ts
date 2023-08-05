import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrdenCompraService } from '../services/orden-compra.service';
import { noop, tap } from 'rxjs';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.scss'],
})
export class OrdenCompraComponent implements OnInit {
  ordenescompra: any[] = [];
  headers: Array<string> = ['Nro. NP', 'Id Art.', 'Cantidad'];

  constructor(
    private readonly ordencompraService: OrdenCompraService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.ordencompraService
      .getAll()
      .pipe(
        tap((ordenescompra) => {
          this.ordenescompra = ordenescompra.map((np) => {
            return {
              'Nro. NP': np.idnotped,
              'Id Art.': np.idArticulo,
              Cantidad: np.cantidad,
            };
          });
          console.log(ordenescompra);

          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }
}
