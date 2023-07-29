import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { noop, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RemitoService } from '../services/remito.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { MatDialog } from '@angular/material/dialog';
import { Remito } from 'src/app/shared/types/Remito';

@Component({
  selector: 'app-remito',
  templateUrl: './remito.component.html',
  styleUrls: ['./remito.component.scss'],
})
export class RemitoComponent implements OnInit {
  remitos: any[] = [];
  headers: Array<string> = ['Nro. Remito', 'Importe'];
  actions: Array<{ name: string; label: string; estado: string }> = [
    { name: 'cumplirRemitos', label: 'Cumplir Remitos', estado: 'asd' },
  ];

  constructor(
    private readonly remitoService: RemitoService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    console.log('Entro - Remito');

    this.remitoService
      .getAll()
      .pipe(
        tap((remitos) => {
          this.remitos = remitos.map((rem) => {
            return {
              'Nro. Remito': rem.idRemito,
              Importe: rem.importeFinal,
              Estado: rem.estado,
            };
          });
          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }

  onTableAction({ name, row }: { name: string; row: any }) {
    console.log(row);

    if (name === 'cumplirRemitos') {
      const formFields = [
        {
          name: 'estado',
          label: 'Estado',
          type: 'string',
          required: true,
          value: row['Estado'],
        },
      ];
      this.openDialog('Cumplir Remito', formFields, {
        ...row,
        actionType: name,
      });
    }
  }

  openDialog(title: string, formFields: any[], rowData: any) {
    console.log('entro');

    const dialogRef = this.dialog.open(TableComponent, {
      data: {
        title,
        formConfig: formFields,
        rowData,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.actionType === 'cumplirRemitos') {
        const remitoUpdate: Remito = {
          idRem: rowData['Nro. Remito'],
          estado: result.estado,
        };
        this.remitoService
          .update(remitoUpdate)
          .pipe(
            tap(() => {
              this.getData();
            })
          )
          .subscribe(noop);
      }
    });
  }
}
