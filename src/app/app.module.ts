import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotaPedidoComponent } from './nota-pedido/components/nota-pedido.component';
import { TableComponent } from './shared/components/table/table.component';
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
import { GenericFormComponent } from './shared/components/generic-form/components/generic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacturaModule } from './factura/factura.module';

@NgModule({
  declarations: [
    AppComponent,
    NotaPedidoComponent,
    AlmacenComponent,
    ArticulosComponent,
    ClienteComponent,
    RemitoComponent,
    StockComponent,
    UserRoleComponent,
    UsersComponent,
    NavbarComponent,
    FooterComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
