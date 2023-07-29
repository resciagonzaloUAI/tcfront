import { FacturaArticulo } from './FacturaArticulo';

export interface Factura {
  idFactura?: number;
  idCliente?: number;
  idpedido?: number;
  precio?: number;
  idRemito?: number;
  generaRemito?: boolean;
  facturaArticulo?: FacturaArticulo[];
}
