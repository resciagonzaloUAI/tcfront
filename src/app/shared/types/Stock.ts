import { Articulo } from './Articulo';

export interface Stock {
  idAlm?: number;
  idArt?: number;
  stock?: number;
  articulo?: Articulo;
}
