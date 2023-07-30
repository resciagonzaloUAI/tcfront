import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { noop, tap } from 'rxjs';
import { RemitoService } from '../services/remito.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-remito',
  templateUrl: './remito.component.html',
  styleUrls: ['./remito.component.scss'],
})
export class RemitoComponent implements OnInit {
  remitos: any[] = [];
  headers: Array<string> = ['Nro. Remito', 'Nro. Factura', 'Importe', 'Estado'];
  actions: Array<{ name: string; label: string }> = [
    { name: 'cumplirRemitos', label: 'Cumplir Remitos' },
  ];
  idcfactura: string | null = null;
  importeFinal: string | null = null;
  idremito: string | null = null;

  constructor(
    private readonly remitoService: RemitoService,
    private readonly cd: ChangeDetectorRef,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.remitoService
      .getAll()
      .pipe(
        tap((remitos) => {
          this.remitos = remitos.map((rem) => {
            return {
              'Nro. Remito': rem.idremito,
              'Nro. Factura': rem.idcfactura,
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
    if (name === 'cumplirRemitos') {
      this.remitoService
        .cumpleRemito(row['Nro. Remito'])
        .pipe(
          tap(() => {
            this.snackBar.open(
              `Remito: ${row['Nro. Remito']} cumplido correctamente`
            );
            this.getData();
          })
        )
        .subscribe(noop);
    }
  }
}
