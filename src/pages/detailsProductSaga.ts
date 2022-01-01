import { takeLatest, call, put } from 'redux-saga/effects';
import { getProduct, getProductSuccess } from './detailsProductSlice';
import productApi from '../app/api/productApi';
import { Product } from '../interfaces/interface';
import { PayloadAction } from '@reduxjs/toolkit';

interface Result {
  product: Product;
}

function* fetchDetailsProductSaga(action: PayloadAction) {
  const detailsProduct: Result = yield call((): any =>
    productApi.getDetailsProduct(action.payload)
  );
  console.log(action?.payload);
  yield put(getProductSuccess(detailsProduct));
}

export default function* detailsProductSaga() {
  yield takeLatest(getProduct.toString(), fetchDetailsProductSaga);
}
