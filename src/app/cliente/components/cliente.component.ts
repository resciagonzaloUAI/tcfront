import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { noop, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  clientes: any[] = [];
  headers: Array<string> = ['Nro. Cliente', 'Nombre', 'Tipo Cliente'];
  actions: Array<{ name: string; label: string }> = [
    { name: 'ver', label: 'Ver' },
  ];

  constructor(
    private readonly clienteService: ClienteService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    console.log('entro.,,,,,');

    this.clienteService
      .getAll()
      .pipe(
        tap((clientes) => {
          this.clientes = clientes.map((cl) => {
            return {
              'Nro. Cliente': cl.idcliente,
              Nombre: cl.nombreCliente,
              'Tipo Cliente': cl.tipoCliente,
            };
          });
          this.cd.detectChanges();
        })
      )
      .subscribe(noop);
  }
}
