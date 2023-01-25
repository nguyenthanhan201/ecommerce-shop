import { Auth } from './auth.type';
import { BasedModel } from './index';
import { Product } from './product.type';
export interface Rating extends BasedModel {
  idAuth: Auth;
  idProduct: Product;
  rating: number;
  comment: string;
}