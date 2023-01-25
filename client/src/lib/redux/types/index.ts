export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_HIDE_PRODUCTS = "GET_HIDE_PRODUCTS";
export const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
export const GET_CART_ITEMS = "GET_CART_ITEMS";

export interface BasedModel {
  _id: string;
  createdAt: string;
  updatedAt: string;
}