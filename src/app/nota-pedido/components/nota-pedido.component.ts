import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotaPedidoService } from '../services/nota-pedido.service';
import { noop, tap } from 'rxjs';

@Component({
  selector: 'app-nota-pedido',
  templateUrl: './nota-pedido.component.html',
  styleUrls: ['./nota-pedido.component.scss'],
})
export class NotaPedidoComponent implements OnInit {
  notaspedidos: any[] = [];
  headers: Array<string> = ['Nro. NP', 'Id Art.', 'Cantidad'];

  constructor(
    private readonly notapedidoService: NotaPedidoService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.notapedidoService
      .getAll()
      .pipe(
        tap((notaspedidos) => {
          this.notaspedidos = notaspedidos.map((np) => {
            return {
              'Nro. NP': np.idnotped,
              'Id Art.': np.idArt,
              Cantidad: np.cantidadArt,
            };
          });
          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }
}
