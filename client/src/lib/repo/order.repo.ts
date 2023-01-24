import { get, post } from "../axios/requests";
import { CrudRepository } from "./crud.repo";

export class OrderRepository extends CrudRepository<any> {
  apiName = 'order';
  displayName = 'Order';

  async createOrder(amount: number, cartItems: any) {
    const res = await post(`/order/create_payment_url`, { amount, cartItems });
    return res;
  }

  async addOrder(idAuth: string) {
    const res = await post(`/order/add-order`, { idAuth });
    return res;
  }

  async getOrders(idAuth: string) {
    const res = await get(`/order/show/${idAuth}`);
    return res;
  }
}
export const OrderServices = new OrderRepository();