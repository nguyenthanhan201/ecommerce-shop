import { get, post } from "../axios/requests";

export class CartRepository {
  async createCartItem(idAuth: string, idProduct: string, size: string, color: string, quantity: number) {
    const res = await post(`/cart-item/create`, { idAuth, idProduct, size, color, quantity });
    return res;
  };

  async deleteCartItem(
    idAuth: string,
    idProduct: string,
    size: string,
    color: string,
  ) {
    const res = await post(`/cart-item/delete`, { idAuth, idProduct, size, color });
    return res;
  };

  async getCartItems(idAuth: string) {
    const res = await get(`/cart-item/${idAuth}`);
    return res;
  };

  async clearCartByIdAuth(idAuth: string) {
    const res = await post(`/cart-item/clear-cart`, { idAuth });
    return res;
  }
}
export const CartServices = new CartRepository();