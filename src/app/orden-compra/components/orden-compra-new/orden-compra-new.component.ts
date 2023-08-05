import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, noop, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { ProveedoresService } from 'src/app/proveedores/services/proveedores.service';
import { ArticulosService } from 'src/app/articulos/services/articulos.service';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { OrdenCompraArticulo } from 'src/app/shared/types/OrdenCompraArticulo';
import { OrdenCompra } from 'src/app/shared/types/OrdenCompra';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-compra-new',
  templateUrl: './orden-compra-new.component.html',
  styleUrls: ['./orden-compra-new.component.scss'],
})
export class OrdenCompraNewComponent implements OnInit {
  provControl = new FormControl<string | any>('');
  articuloControl = new FormControl<string | any>('');
  ordenCompra = new FormControl<boolean>(false);
  ordenCompraNro = new FormControl<number | null>({
    value: null,
    disabled: true,
  });
  artQty = new FormControl<string | any>('');
  filteredProvs: Observable<any[]> = of([]);
  filteredArticulos: Observable<any[]> = of([]);
  form = new FormGroup({});
  proveedores: any[] = [];
  articulos: any[] = [];
  selectedProvs: any = null;
  tempSelectedArticulo: any = null;
  selectedArticulos: any[] = [];
  constructor(
    private readonly proveedorService: ProveedoresService,
    private readonly articulosService: ArticulosService,
    private readonly ordenCompraService: OrdenCompraService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.proveedorService
      .getAll()
      .pipe(
        tap((proveedores) => {
          this.proveedores = proveedores;
        })
      )
      .subscribe(noop);

    this.provControl.valueChanges
      .pipe(
        map((value) => {
          console.log(value);

          if (value?.id) {
            this.articulosService
              .getAllByProvs(value.id)
              .pipe(
                tap((articulos) => {
                  console.log(articulos);

                  this.articulos = articulos;
                })
              )
              .subscribe(noop);
          }
        })
      )
      .subscribe(noop);

    this.filteredProvs = this.provControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const nombre = typeof value === 'string' ? value : value?.nombre;
        return nombre
          ? this._filterCliente(nombre as string)
          : this.proveedores.slice();
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

  displayFnProveedores(proveedores: any): string {
    return proveedores && proveedores.nombre ? proveedores.nombre : '';
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

  private _filterCliente(nombreProv: string): any[] {
    const filterValue = nombreProv.toLowerCase();

    return this.proveedores.filter((proveedores) =>
      proveedores.nombre.toLowerCase().includes(filterValue)
    );
  }

  handleSelectProv(selection: any) {
    this.selectedProvs = selection.option.value;
  }

  handleSelectArticulo(selection: any) {
    this.tempSelectedArticulo = selection.option.value;
  }

  /*async validaStock() {
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
  }*/

  addArticulo() {
    this.selectedArticulos.push({
      articulo: this.tempSelectedArticulo,
      cantidad: this.artQty.value,
    });
    const idArtArray = this.selectedArticulos.map(
      (item) => item.articulo.idArt
    );
    this.tempSelectedArticulo = null;
    console.log(this.selectedArticulos);
  }

  deleteArticulo(articulo: any) {
    const index = this.selectedArticulos.indexOf(articulo);
    this.selectedArticulos.splice(index, 1);
  }

  crearOrdenCompra(): void {
    console.log(this.provControl.getRawValue());

    const ordenCompra: OrdenCompra = {
      idProveedor: this.provControl.getRawValue().id,
      ordenCompraArticulo: this.selectedArticulos.map((art) => ({
        idArticulo: art.articulo.idArt,
        cantidad: art.cantidad,
      })),
    };

    this.ordenCompraService
      .create(ordenCompra)
      .pipe(
        tap((resp) => {
          const message = 'Orden de Compra creada correctamente';
          this.snackBar.open(message, 'Cerrar', {
            duration: 2000,
          });
          this.router.navigate(['/orden-compra']);
        })
      )
      .subscribe(noop);
    console.log(ordenCompra);
  }
}
