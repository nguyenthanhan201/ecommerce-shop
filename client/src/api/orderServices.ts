import { get, post } from "lib/axios/requests";

export const createOrderAPI = async (amount: number) => {
  const res = await post(`/order/create_payment_url`, { amount });
  return res;
}

export const addOrderAPI = async (idAuth: string) => {
  const res = await post(`/order/add-order`, { idAuth });
  return res;
}

export const getOrdersAPI = async (idAuth: string) => {
  const res = await get(`/order/show/${idAuth}`);
  return res;
}