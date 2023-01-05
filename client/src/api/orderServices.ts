import { post } from "lib/axios/requests";

export const createOrderAPI = async (amount: number) => {
  const res = await post(`/order/create_payment_url`, { amount });
  return res;
}

export const addOrderAPI = async (order: any) => {
  const res = await post(`/order/add-order`, order);
  return res;
}