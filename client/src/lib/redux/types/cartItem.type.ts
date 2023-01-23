import { Auth } from './auth.type';
import {Product} from './product.type';
export interface CartItem {
  idAuth: Auth;
  idProduct: Product;
  size: string;
  color: string;
  quantity: number;
}