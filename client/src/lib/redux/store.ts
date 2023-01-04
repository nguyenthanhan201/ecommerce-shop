import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { rootSaga } from "./sagas";
import auth from "./slices/auth";
import cartItems from "./slices/cartItems";
import productModel from "./slices/productModel";
import products from "./slices/products";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    cartItems,
    productModel,
    products,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
