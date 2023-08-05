import { OrdenCompraArticulo } from "./OrdenCompraArticulo";

export interface OrdenCompra {
  idnotped?: number;
  estado?: string;
  idProveedor?: number;
  precio?: number;
  createAt?: Date;
  ordenCompraArticulo?: OrdenCompraArticulo[];
}
