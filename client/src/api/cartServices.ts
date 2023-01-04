import { get, post } from "lib/axios/requests";

export const createCartItemAPI = async (idAuth: string, idProduct: string, size: string, color: string, quantity: number) => {
  const res = await post(`/cart-item/create`, { idAuth, idProduct, size, color, quantity });
  return res;
};

export const deleteCartItemAPI = async (
  idAuth: string,
  idProduct: string,
  size: string,
  color: string,
) => {
  const res = await post(`/cart-item/delete`, { idAuth, idProduct, size, color });
  return res;
};

export const getCartItemsAPI = async (idAuth: string) => {
  const res = await get(`/cart-item/${idAuth}`);
  return res;
};

export const clearCartByIdAuthAPI = async (idAuth: string) => {
  const res = await post(`/cart-item/clear-cart`, { idAuth });
  return res;
}