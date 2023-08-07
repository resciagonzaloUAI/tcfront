import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotaPedidoComponent } from './nota-pedido/components/nota-pedido.component';
import { AlmacenComponent } from './almacen/components/almacen.component';
import { ArticulosComponent } from './articulos/components/articulos.component';
import { ClienteComponent } from './cliente/components/cliente.component';
import { RemitoComponent } from './remito/components/remito.component';
import { StockComponent } from './stock/components/stock.component';
import { UserRoleComponent } from './user-role/components/user-role.component';
import { UsersComponent } from './users/components/users.component';
import { SharedModule } from './shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacturaModule } from './factura/factura.module';
import { HomeComponent } from './home/components/home.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotaPedidoModule } from './nota-pedido/nota-pedido.module';
import { OrdenCompraModule } from './orden-compra/orden-compra.module';
import { ReportesModule } from './reportes/reportes.module';

@NgModule({
  declarations: [
    AppComponent,
    AlmacenComponent,
    ArticulosComponent,
    ClienteComponent,
    RemitoComponent,
    StockComponent,
    UserRoleComponent,
    UsersComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    FacturaModule,
    NotaPedidoModule,
    OrdenCompraModule,
    ReportesModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
