import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { noop, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { GenericFormDialogComponent } from 'src/app/shared/components/generic-form-dialog.component.ts/generic-form-dialog.component';
import { Cliente } from 'src/app/shared/types/Cliente';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  clientes: any[] = [];
  headers: Array<string> = ['Nro. Cliente', 'Nombre', 'Tipo Cliente'];
  actions: Array<{ name: string; label: string }> = [
    { name: 'edit', label: 'Editar Cliente' },
    { name: 'delete', label: 'Dar de baja Cliente' },
  ];

  constructor(
    private readonly clienteService: ClienteService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router,
    private readonly dialog: MatDialog
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
              Activo: cl.isActive,
            };
          });
          this.cd.detectChanges();
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
          name: 'tipo',
          label: 'Tipo Cliente',
          type: 'text',
          required: true,
          value: row['Tipo Cliente'],
        },
      ];
      this.openDialog('Edit', formFields, { ...row, actionType: name });
    } else if (name === 'delete') {
      const formFields = [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
          value: row['Nombre'],
        },
      ];

      this.openDialog('delete', formFields, { ...row, actionType: name });
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
          const clUpdate: Cliente = {
            idcliente: rowData['Nro. Cliente'],
            nombreCliente: result.name,
            tipoCliente: result.tipo,
          };
          this.clienteService
            .update(clUpdate)
            .pipe(
              tap(() => {
                this.getData();
              })
            )
            .subscribe(noop);
        } else if (result?.actionType === 'delete') {
          console.log('entro al delete');

          const clienteUpdate: Cliente = {
            idcliente: rowData['Nro. Cliente'],
            isActive: 0,
          };
          console.log(clienteUpdate);

          this.clienteService
            .update(clienteUpdate)
            .pipe(
              tap(() => {
                this.getData();
              })
            )
            .subscribe(noop);
        }
        this.cd.detectChanges();
      }
    });
  }
}
