import { put, takeEvery } from "redux-saga/effects";
import { getHideProductsAPI, getProductsAPI } from "../../../api/productServices";
import { setProductsSlice } from "../slices/products";
import { GET_HIDE_PRODUCTS, GET_PRODUCTS } from "../types";

export function* getProductsSaga(): any {
  const products = yield getProductsAPI();
  yield put(setProductsSlice(products));
}
export function* getHideProductsSaga(): any {
  const products = yield getHideProductsAPI();
  yield put(setProductsSlice(products));
}

export function* watchProductsAsync() {
  yield takeEvery(GET_PRODUCTS, getProductsSaga);
  yield takeEvery(GET_HIDE_PRODUCTS, getHideProductsSaga);
}
