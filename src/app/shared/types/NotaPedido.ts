import { NotaPedidoArticulo } from './NotaPedidoArticulo';

export interface NotaPedido {
  idnotped?: number;
  idArt?: number;
  cantidadArt?: number;
  createdARt?: number;
  idCliente?: number;
  notapedidoArticulo?: NotaPedidoArticulo[];
}
