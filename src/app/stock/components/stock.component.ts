import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Observable, noop, of, switchMap, tap } from 'rxjs';
import { ArticulosService } from 'src/app/articulos/services/articulos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenericFormDialogComponent } from 'src/app/shared/components/generic-form-dialog.component.ts/generic-form-dialog.component';
import { Articulo } from 'src/app/shared/types/Articulo';
import { Stock } from 'src/app/shared/types/Stock';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  products: any[] = [];
  headers: Array<string> = ['Nro. Articulo', 'Nombre', 'Precio', 'Stock'];
  actions: Array<{ name: string; label: string }> = [
    { name: 'edit', label: 'Edit' },
    { name: 'edit-stock', label: 'Editar Stock' },
    { name: 'delete', label: 'Delete' },
  ];
  idAlm: string | null = null;

  constructor(
    private readonly stockService: StockService,
    private readonly articuloService: ArticulosService,
    private readonly cd: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((query) => {
          this.idAlm = query.get('IdAlm');
          return this.stockService.getAll({ idAlm: this.idAlm }).pipe(
            tap((products) => {
              this.products = products.map((prod) => {
                return {
                  'Nro. Articulo': prod.idArt,
                  Nombre: prod?.articulo?.nombreArt,
                  Precio: prod?.articulo?.precioArt,
                  Stock: prod.stock,
                };
              });
              this.cd.detectChanges();
            })
          );
        })
      )
      .subscribe(noop);
  }

  onTableAction({ name, row }: { name: string; row: any }) {
    console.log(row);

    if (name === 'edit') {
      const formFields = [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
          value: row['Nombre'],
        },
        {
          name: 'price',
          label: 'Precio',
          type: 'number',
          required: true,
          value: row['Precio'],
        },
      ];
      this.openDialog('Edit', formFields, { ...row, actionType: name });
    } else if (name === 'edit-stock') {
      const formFields = [
        {
          name: 'stock',
          label: 'Stock',
          type: 'number',
          required: true,
          value: row['Stock'],
        },
      ];
      this.openDialog('Edit Stock', formFields, { ...row, actionType: name });
    } else if (name === 'delete') {
      this.articuloService
        .delete(row['Nro. Articulo'])
        .pipe(
          tap(() => {
            this.getData();
          })
        )
        .subscribe(noop);
    }
  }

  openDialog(title: string, formFields: any[], rowData: any) {
    console.log('entro');

    const dialogRef = this.dialog.open(GenericFormDialogComponent, {
      data: {
        title,
        formConfig: formFields,
        rowData,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result?.actionType === 'edit') {
          const artUpdate: Articulo = {
            idArt: rowData['Nro. Articulo'],
            nombreArt: result.name,
            precioArt: result.price,
          };
          this.articuloService
            .update(artUpdate)
            .pipe(
              tap(() => {
                this.getData();
              })
            )
            .subscribe(noop);
        } else if (result?.actionType === 'edit-stock') {
          const stockUpdate: Stock = {
            idArt: rowData['Nro. Articulo'],
            idAlm: +this.idAlm!,
            stock: result.stock,
          };
          this.stockService
            .update(stockUpdate)
            .pipe(
              tap(() => {
                this.getData();
              })
            )
            .subscribe(noop);
        }
      }
    });
  }
}
