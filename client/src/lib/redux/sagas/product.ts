import { ProductServices } from "@/lib/repo/product.repo";
import { put, takeEvery } from "redux-saga/effects";
import { setErrProductSlice, setProductsSlice } from "../slices/products";
import { GET_HIDE_PRODUCTS, GET_PRODUCTS } from "../types";

export function* getProductsSaga(): any {
  const products = yield ProductServices.getAll();
  yield put(setProductsSlice(products));
}
export function* getHideProductsSaga(): any {
  try {
    const products = yield ProductServices.getHideProducts();
    yield put(setProductsSlice(products));
  } catch (err: any) {
    // if jwt expired
    yield put(setErrProductSlice(err.response.data.error.name))
  }
}

export function* watchProductsAsync() {
  yield takeEvery(GET_PRODUCTS, getProductsSaga);
  yield takeEvery(GET_HIDE_PRODUCTS, getHideProductsSaga);
}
