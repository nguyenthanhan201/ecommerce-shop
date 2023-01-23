import { get, post } from "lib/axios/requests";

export const getAllOrdersAPI = async () => {
  const res = await get(`/order/getAllOrders`, {
    headers: {
      "authentication": "Bearer " + localStorage.getItem("token"),
    }
  });
  return res;
}
export const createOrderAPI = async (amount: number, cartItems: any) => {
  const res = await post(`/order/create_payment_url`, { amount, cartItems });
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