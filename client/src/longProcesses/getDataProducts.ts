/* eslint-disable no-restricted-globals */
import { ProductServices } from "@/lib/repo/product.repo";
import { processList } from "./enums";

self.onmessage = async (e: MessageEvent<string>) => {
  if (e.data === processList.getData) {
    const products = await ProductServices.getAll();
    self.postMessage(products)
  }
}