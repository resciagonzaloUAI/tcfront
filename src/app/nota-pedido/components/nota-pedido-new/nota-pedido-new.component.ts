import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, noop, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ArticulosService } from 'src/app/articulos/services/articulos.service';
import { NotaPedidoService } from '../../services/nota-pedido.service';
import { NotaPedido } from 'src/app/shared/types/NotaPedido';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StockService } from 'src/app/stock/services/stock.service';

@Component({
  selector: 'app-nota-pedido-new',
  templateUrl: './nota-pedido-new.component.html',
  styleUrls: ['./nota-pedido-new.component.scss'],
})
export class NotaPedidoNewComponent implements OnInit {
  clienteControl = new FormControl<string | any>('');
  articuloControl = new FormControl<string | any>('');
  notaPedido = new FormControl<boolean>(false);
  generaRemito = new FormControl<boolean>(false);
  notaPedidoNro = new FormControl<number | null>({
    value: null,
    disabled: true,
  });
  artQty = new FormControl<string | any>('');
  filteredClientes: Observable<any[]> = of([]);
  filteredArticulos: Observable<any[]> = of([]);
  form = new FormGroup({});
  clients: any[] = [];
  articulos: any[] = [];
  selectedCliente: any = null;
  tempSelectedArticulo: any = null;
  selectedArticulos: any[] = [];
  stockArticulo: any = null;
  stock2: any = null;
  constructor(
    private readonly clientService: ClienteService,
    private readonly articulosService: ArticulosService,
    private readonly notapedidoService: NotaPedidoService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly stockService: StockService
  ) {}

  ngOnInit() {
    this.clientService
      .getAll()
      .pipe(
        tap((clients) => {
          this.clients = clients;
        })
      )
      .subscribe(noop);

    this.articulosService
      .getAll()
      .pipe(
        tap((articulos) => {
          console.log(articulos);

          this.articulos = articulos;
        })
      )
      .subscribe(noop);

    this.filteredClientes = this.clienteControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const nombreCliente =
          typeof value === 'string' ? value : value?.nombreCliente;
        return nombreCliente
          ? this._filterCliente(nombreCliente as string)
          : this.clients.slice();
      })
    );

    this.filteredArticulos = this.articuloControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const nombreArt = typeof value === 'string' ? value : value?.nombreArt;
        return nombreArt
          ? this._filterArticulo(nombreArt as string)
          : this.articulos.slice();
      })
    );
  }

  displayFnClientes(client: any): string {
    return client && client.nombreCliente ? client.nombreCliente : '';
  }

  displayFnArticulos(articulo: any): string {
    return articulo && articulo.nombreArt ? articulo.nombreArt : '';
  }

  private _filterArticulo(nombreArt: string): any[] {
    const filterValue = nombreArt.toLowerCase();

    return this.articulos.filter((art) =>
      art.nombreArt.toLowerCase().includes(filterValue)
    );
  }

  private _filterCliente(nombreCliente: string): any[] {
    const filterValue = nombreCliente.toLowerCase();

    return this.clients.filter((client) =>
      client.nombreCliente.toLowerCase().includes(filterValue)
    );
  }

  handleSelectCliente(selection: any) {
    this.selectedCliente = selection.option.value;
  }

  handleSelectArticulo(selection: any) {
    this.tempSelectedArticulo = selection.option.value;
  }

  async validaStock() {
    try {
      // Loop through each ID and fetch the stock for each article

      this.selectedArticulos.push({
        articulo: this.tempSelectedArticulo,
        cantidad: this.artQty.value,
      });
      const idArtArray = this.selectedArticulos.map(
        (item) => item.articulo.idArt
      );

      console.log('a ver si trae algo');
      console.log(idArtArray);
      idArtArray.forEach((idArt) => {
        this.stockService.getStockForArticulo(idArt).subscribe(
          (stock: number) => {
            // Handle the stock value here
            console.log(`Stock for article ${idArt}: ${stock}`);
            let stockArticulo = stock;

            let stock2 = this.selectedArticulos[0].cantidad;
            console.log('abajo');
            console.log(stock2);
            console.log(stockArticulo);
            console.log(stock);

            if (stockArticulo >= stock2) {
              // Sufficient stock available, add the article to the selectedArticulos array
              const messagge = 'Stock Agregado correctamente';
              this.snackBar.open(messagge, 'Cerrar', {
                duration: 4000,
              });
              this.tempSelectedArticulo = null;
            } else {
              // Insufficient stock, show an error message or notification to the user
              const errorMessage = 'No hay stock suficiente';
              this.snackBar.open(errorMessage, 'Cerrar', {
                duration: 2000,
              });
              this.deleteArticulo(idArtArray);
            }
            this.stockArticulo = null;
            this.stock2 = null;
          },
          (error: any) => {
            // Handle the error here (e.g., show an error message)
            console.error(`Error fetching stock for article ${idArt}:`, error);
          }
        );
      });
    } catch (error) {
      console.error('No encuentro el stock:', error);
      // Handle error when fetching stock
    }
  }

  addArticulo() {
    this.validaStock();
    this.tempSelectedArticulo = null;
    console.log(this.selectedArticulos);
  }

  deleteArticulo(articulo: any) {
    const index = this.selectedArticulos.indexOf(articulo);
    this.selectedArticulos.splice(index, 1);
  }

  crearNotaPedido(): void {
    const notapedido: NotaPedido = {
      idCliente: this.clienteControl.getRawValue().idcliente,
      notapedidoArticulo: this.selectedArticulos.map((art) => ({
        idArticulo: art.articulo.idArt,
        cantidad: art.cantidad,
      })),
    };

    this.notapedidoService
      .create(notapedido)
      .pipe(
        tap((resp) => {
          const message = 'Nota de pedido creada correctamente';
          this.snackBar.open(message, 'Cerrar', {
            duration: 2000,
          });
          this.router.navigate(['/nota-pedido']);
        })
      )
      .subscribe(noop);
    console.log(notapedido);
  }
}
