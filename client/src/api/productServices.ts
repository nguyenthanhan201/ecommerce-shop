import { Product } from "@/lib/redux/types/product.type";
import { get, post } from "lib/axios/requests";

export const getProductsAPI = async () => {
  try {
    const res = await get('/products');
    return res;
  } catch (err) {
    return console.log(err);
  }
};

export const createProductAPI = async (product: Product) => {
  const res = await post('/products/store', product);
  return res;
};

export const updateProductAPI = async (product: Product) => {
  const res = await post(`/products/${product._id}?_method=PUT`, product);
  return res;
};

export const hideProductAPI = async (id: string) => {
  const res = await post(`/products/hide/${id}?_method=PUT`);
  return res;
};

export const unhideProductAPI = async (id: string) => {
  const res = await post(`/products/unhide/${id}?_method=PUT`);
  return res;
};

export const deleteProductAPI = async (id: string) => {
  const res = await post(`/products/${id}?_method=DELETE`);
  return res;
};

export const getHideProductsAPI = async () => {
  const res = await get(`/products/hide`, {
    headers: {
      "authentication": "Bearer " + localStorage.getItem("token"),
    }
  });
  return res;
}

export const getMostViewedProductsAPI = async () => {
  const res = await get(`/products/most-viewed`);
  return res;
}

export const updateViewsProductAPI = async (idProduct: string) => {
  const res = await post(`/products/most-viewed/${idProduct}?_method=PUT`);
  return res;
}
