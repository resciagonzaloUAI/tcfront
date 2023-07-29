import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, noop, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ArticulosService } from 'src/app/articulos/services/articulos.service';
import { FacturaService } from '../../services/factura.service';
import { Factura } from 'src/app/shared/types/Factura';

@Component({
  selector: 'app-factura-new',
  templateUrl: './factura-new.component.html',
  styleUrls: ['./factura-new.component.scss'],
})
export class FacturaNewComponent implements OnInit {
  clienteControl = new FormControl<string | any>('');
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
  constructor(
    private readonly clientService: ClienteService,
    private readonly articulosService: ArticulosService,
    private readonly facturaService: FacturaService
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

  addArticulo() {
    this.selectedArticulos.push({
      articulo: this.tempSelectedArticulo,
      cantidad: this.artQty.value,
    });
    this.tempSelectedArticulo = null;
  }

  deleteArticulo(articulo: any) {
    const index = this.selectedArticulos.indexOf(articulo);
    this.selectedArticulos.splice(index, 1);
  }

  setQty(qty: any) {
    console.log(qty);
  }

  crearFactura(): void {
    console.log(this.clienteControl.getRawValue());

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
    console.log(factura);

    this.facturaService
      .create(factura)
      .pipe(tap((resp) => console.log(resp)))
      .subscribe(noop);
  }
}
