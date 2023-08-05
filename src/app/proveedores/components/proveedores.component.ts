import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { noop, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nota-pedido',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  headers: Array<string> = ['Id', 'Nombre'];
  actions: Array<{ name: string; label: string }> = [
    { name: 'upload', label: 'Cargar Articulos' },
  ];

  constructor(
    private readonly proveedoresService: ProveedoresService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.proveedoresService
      .getAll()
      .pipe(
        tap((proveedores) => {
          this.proveedores = proveedores.map((prov) => {
            return {
              Id: prov.id,
              Nombre: prov.nombre,
            };
          });
          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }

  onTableAction({ name, row }: { name: string; row: any }) {
    console.log(row);

    if (name === 'upload') {
      this.router.navigate(['/proveedores/articulos'], {
        queryParams: { idProveedor: row.Id },
      });
    }
  }
}
