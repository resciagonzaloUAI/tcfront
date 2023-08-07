import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock/stock.module').then((m) => m.StockModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'almacen',
    loadChildren: () =>
      import('./almacen/almacen.module').then((m) => m.AlmacenModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'factura',
    loadChildren: () =>
      import('./factura/factura.module').then((m) => m.FacturaModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'nota-pedido',
    loadChildren: () =>
      import('./nota-pedido/nota-pedido.module').then(
        (m) => m.NotaPedidoModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'remito',
    loadChildren: () =>
      import('./remito/remito.module').then((m) => m.RemitoModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./cliente/cliente.module').then((m) => m.ClienteModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'proveedores',
    loadChildren: () =>
      import('./proveedores/proveedores.module').then(
        (m) => m.ProveedoresModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'orden-compra',
    loadChildren: () =>
      import('./orden-compra/orden-compra.module').then(
        (m) => m.OrdenCompraModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'reportes',
    loadChildren: () =>
      import('./reportes/reportes.module').then((m) => m.ReportesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
