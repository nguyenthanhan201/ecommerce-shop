import { all } from "redux-saga/effects";
import { watchCartItemsAsync } from "./cartItem";
import { watchProductsAsync } from "./product";

export function* rootSaga() {
  yield all([watchProductsAsync(), watchCartItemsAsync()]);
}
