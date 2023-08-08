import { FacturaArticulo } from './FacturaArticulo';

export interface Factura {
  idbfactura?: number;
  idCliente?: number;
  idpedido?: number;
  precio?: number;
  idRemito?: number;
  generaRemito?: boolean;
  facturaArticulo?: FacturaArticulo[];
  createdAt?: Date;
  idAlm?: number;
  nombreCliente?: string;
}
