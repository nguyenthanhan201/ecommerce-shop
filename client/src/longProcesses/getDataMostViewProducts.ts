/* eslint-disable no-restricted-globals */
import { getMostViewedProductsAPI } from "api/productServices";
import { processList } from "./enums";

self.onmessage = async (e: MessageEvent<string>) => {
  if (e.data === processList.getDataMostViewedProducts) {
    const products = await getMostViewedProductsAPI().then((res) => {
      return res;
    });
    // console.log("👌 ~ products", products.data)
    self.postMessage(products)
  }
}