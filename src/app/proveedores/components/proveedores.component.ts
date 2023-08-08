import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { noop, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenericFormDialogComponent } from 'src/app/shared/components/generic-form-dialog.component.ts/generic-form-dialog.component';
import { Proveedor } from 'src/app/shared/types/Proveedor';

@Component({
  selector: 'app-nota-pedido',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  headers: Array<string> = ['Id', 'Nombre', 'Email'];
  actions: Array<{ name: string; label: string }> = [
    { name: 'edit', label: 'Editar Proveedor' },
    { name: 'upload', label: 'Cargar Articulos' },
  ];

  constructor(
    private readonly proveedoresService: ProveedoresService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router,
    private readonly dialog: MatDialog
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
              Email: prov.email,
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
    } else if (name === 'edit') {
      const formFields = [
        {
          name: 'name',
          label: 'Nombre',
          type: 'text',
          required: true,
          value: row['Nombre'],
        },
        {
          name: 'email',
          label: 'Email Proveedor',
          type: 'text',
          required: true,
          value: row['Email'],
        },
      ];
      this.openDialog('Edit', formFields, { ...row, actionType: name });
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
        console.log('mando resultado', result);
        if (result?.actionType === 'edit') {
          const prUpload: Proveedor = {
            id: rowData['Id'],
            nombre: result.name,
            email: result.email,
          };
          console.log('prUpload', prUpload);

          this.proveedoresService
            .update(prUpload)
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
