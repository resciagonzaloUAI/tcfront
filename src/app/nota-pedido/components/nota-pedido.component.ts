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
  headers: Array<string> = ['Nro. NP', 'Cliente', 'Valor'];

  constructor(
    private readonly notapedidoService: NotaPedidoService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.notapedidoService
      .getArticulosByNotaPedido()
      .pipe(
        tap((notaspedidos) => {
          console.log(notaspedidos);

          this.notaspedidos = notaspedidos.map((np) => {
            return {
              'Nro. NP': np.idnotped,
              Cliente: np.nombreCliente,
              Valor: '$ ' + np.precio,
            };
          });
          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }
}
