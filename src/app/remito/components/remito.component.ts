import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, noop, tap } from 'rxjs';
import { RemitoService } from '../services/remito.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Remito } from 'src/app/shared/types/Remito';

@Component({
  selector: 'app-remito',
  templateUrl: './remito.component.html',
  styleUrls: ['./remito.component.scss'],
})
export class RemitoComponent implements OnInit {
  remitos: any[] = [];
  headers: Array<string> = [
    'Nro. Remito',
    'Nro. Factura',
    'Cliente',
    'Importe',
    'Estado',
  ];
  actions: Array<{ name: string; label: string }> = [
    { name: 'cumplirRemitos', label: 'Cumplir Remito' },
  ];
  idcfactura: string | null = null;
  importeFinal: string | null = null;
  idremito: string | null = null;

  constructor(
    private readonly remitoService: RemitoService,
    private readonly cd: ChangeDetectorRef,
    private readonly snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.remitoService
      .getAll()
      .pipe(
        map((remitos: Remito[]) =>
          remitos.filter((rem: Remito) => rem.estado === 'PENDIENTE')
        ),
        tap((filteredRemitos: Remito[]) => {
          this.remitos = filteredRemitos.map((rem) => {
            return {
              'Nro. Remito': rem.idremito,
              'Nro. Factura': rem.idcfactura,
              Cliente: rem.nombreCliente,
              Importe: rem.importeFinal,
              Estado: rem.estado,
            };
          });
          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }

  get isAdminLogguedIn() {
    return this.authService.isAdminLogguedIn();
  }

  onTableAction({ name, row }: { name: string; row: any }) {
    this.isAdminLogguedIn;
    if (this.isAdminLogguedIn === 1) {
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
    } else {
      this.snackBar.open(`Su usuario no tiene permisos para esta operación`);
    }
  }
}
