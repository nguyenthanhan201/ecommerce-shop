/* eslint-disable no-restricted-globals */
import { ProductServices } from "@/lib/repo/product.repo";
import { processList } from "./enums";

self.onmessage = async (e: MessageEvent<string>) => {
  if (e.data === processList.getDataMostViewedProducts) {
    const products = await ProductServices.getMostViewedProducts().then((res) => {
      return res;
    });
    // console.log("👌 ~ products", products.data)
    self.postMessage(products)
  }
}