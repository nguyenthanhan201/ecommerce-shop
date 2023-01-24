import { get, post } from "../axios/requests";
import { Product } from "../redux/types/product.type";
import { CrudRepository } from "./crud.repo";

export class ProductRepository extends CrudRepository<Product> {
  apiName = 'products';
  displayName = 'Product';

  async createProduct(product: Product) {
    const res = await post('/products/store', product);
    return res;
  };

  async updateProduct(product: Product) {
    const res = await post(`/products/${product._id}?_method=PUT`, product);
    return res;
  };

  async hideProduct(id: string) {
    const res = await post(`/products/hide/${id}?_method=PUT`);
    return res;
  };

  async unhideProduct(id: string) {
    const res = await post(`/products/unhide/${id}?_method=PUT`);
    return res;
  };

  async deleteProduct(id: string) {
    const res = await post(`/products/${id}?_method=DELETE`);
    return res;
  };

  async getHideProducts() {
    const res = await get(`/products/hide`, {
      headers: {
        "authentication": "Bearer " + localStorage.getItem("token"),
      }
    });
    return res;
  }

  async getMostViewedProducts() {
    const res = await get(`/products/most-viewed`);
    return res;
  }

  async updateViewsProduct(idProduct: string) {
    const res = await post(`/products/most-viewed/${idProduct}?_method=PUT`);
    return res;
  }
}
export const ProductServices = new ProductRepository();