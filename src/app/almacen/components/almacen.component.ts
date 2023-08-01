import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlmacenService } from '../services/almacen.service';
import { noop, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.scss'],
})
export class AlmacenComponent implements OnInit {
  almacenes: any[] = [];
  headers: Array<string> = ['Nro. Almacen', 'Nombre'];
  actions: Array<{ name: string; label: string }> = [
    { name: 'ver', label: 'Ver' },
  ];

  constructor(
    private readonly almacenService: AlmacenService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.almacenService
      .getAll()
      .pipe(
        tap((almacenes) => {
          this.almacenes = almacenes.map((alm) => {
            return {
              'Nro. Almacen': alm.idAlm,
              Nombre: alm.nombreAlm,
            };
          });
          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }

  onTableAction({ name, row }: { name: string; row: any }) {
    if (name === 'ver') {
      console.log(row);

      this.router.navigate(['/stock'], {
        queryParams: { IdAlm: row['Nro. Almacen'] },
      });
    }
  }
}
