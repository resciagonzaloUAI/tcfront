import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock/stock.module').then((m) => m.StockModule),
  },
  {
    path: 'almacen',
    loadChildren: () =>
      import('./almacen/almacen.module').then((m) => m.AlmacenModule),
  },
  {
    path: 'factura',
    loadChildren: () =>
      import('./factura/factura.module').then((m) => m.FacturaModule),
  },
  {
    path: 'nota-pedido',
    loadChildren: () =>
      import('./nota-pedido/nota-pedido.module').then(
        (m) => m.NotaPedidoModule
      ),
  },
  {
    path: 'remito',
    loadChildren: () =>
      import('./remito/remito.module').then((m) => m.RemitoModule),
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./cliente/cliente.module').then((m) => m.ClienteModule),
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
