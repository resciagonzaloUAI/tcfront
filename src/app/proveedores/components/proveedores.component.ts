import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { noop, tap } from 'rxjs';

@Component({
  selector: 'app-nota-pedido',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  headers: Array<string> = ['Id', 'Nombre'];

  constructor(
    private readonly proveedoresService: ProveedoresService,
    private readonly cd: ChangeDetectorRef
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
}
