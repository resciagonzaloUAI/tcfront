import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, noop, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ArticulosService } from 'src/app/articulos/services/articulos.service';
import { FacturaService } from '../../services/factura.service';
import { Factura } from 'src/app/shared/types/Factura';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StockService } from 'src/app/stock/services/stock.service';
import { Stock } from 'src/app/shared/types/Stock';

@Component({
  selector: 'app-factura-new',
  templateUrl: './factura-new.component.html',
  styleUrls: ['./factura-new.component.scss'],
})
export class FacturaNewComponent implements OnInit {
  clienteControl = new FormControl<string | any>('');
  almacenControl = new FormControl<string | any>('');
  articuloControl = new FormControl<string | any>('');
  notaPedido = new FormControl<boolean>(false);
  generaRemito = new FormControl<boolean>(false);
  notaPedidoNro = new FormControl<number | null>({
    value: null,
    disabled: true,
  });
  artQty = new FormControl<string | any>('');
  options: any[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredClientes: Observable<any[]> = of([]);
  filteredArticulos: Observable<any[]> = of([]);
  form = new FormGroup({});
  clients: any[] = [];
  articulos: any[] = [];
  selectedCliente: any = null;
  tempSelectedArticulo: any = null;
  selectedArticulos: any[] = [];
  tempSelectedArticuloC: any[] = [];
  stockData: any = null;
  idArt: any;
  cantidad: any;
  idArtArray: any;
  cantArray: any;
  stock2: any = null;
  stockArticulo: any;
  stock: any;
  idAlm: number = 1;

  constructor(
    private readonly clientService: ClienteService,
    private readonly articulosService: ArticulosService,
    private readonly facturaService: FacturaService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly stockService: StockService
  ) {}

  ngOnInit() {
    this.notaPedido.valueChanges
      .pipe(
        tap((value) => {
          if (value) {
            this.notaPedidoNro.enable();
          } else {
            this.notaPedidoNro.disable();
          }
        })
      )
      .subscribe(noop);

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
    console.log(articulo);

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
          (error) => {
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
  }

  deleteArticulo(articulo: any) {
    const index = this.selectedArticulos.indexOf(articulo);
    this.selectedArticulos.splice(index, 1);
  }

  crearFactura(): void {
    const factura: Factura = {
      idCliente: this.clienteControl.getRawValue().idcliente,
      facturaArticulo: this.selectedArticulos.map((art) => ({
        idArticulo: art.articulo.idArt,
        cantidad: art.cantidad,
      })),
      idpedido:
        this.notaPedido.value && this.notaPedidoNro.value
          ? this.notaPedidoNro.value
          : undefined,
      generaRemito: !!this.generaRemito.value,
    };

    this.facturaService
      .create(factura)
      .pipe(
        tap((resp) => {
          this.snackBar.open(`Factura creada correctamente`);
          this.router.navigate(['/factura']);
        })
      )
      .subscribe(noop);
  }
}
