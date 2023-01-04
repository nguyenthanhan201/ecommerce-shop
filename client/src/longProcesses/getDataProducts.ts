/* eslint-disable no-restricted-globals */
import { getProductsAPI } from "api/productServices";
import { processList } from "./enums";

self.onmessage = async (e: MessageEvent<string>) => {
  if (e.data === processList.getData) {
    const products = await getProductsAPI();
    self.postMessage(products)
  }
}