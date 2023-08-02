import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { noop, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RemitoService } from '../../services/remito.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  remitos: any[] = [];
  headers: Array<string> = ['Nro. Remito', 'Nro. Factura', 'Importa', 'Estado'];

  constructor(
    private readonly remitoService: RemitoService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.remitoService
      .getAll()
      .pipe(
        tap((data) => {
          this.remitos = data.map((rem) => {
            return {
              'Nro. Remito': rem.idremito,
              'Nro. Factura': rem.idcfactura,
              Importa: rem.importeFinal,
              Estado: rem.estado,
            };
          });
          this.cd.detectChanges();
          console.log(this.remitos);
        })
      )
      .subscribe(noop);
  }
}
