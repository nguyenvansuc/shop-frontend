import { configureStore } from '@reduxjs/toolkit';
import currentUserSlice from '../../pages/currentUserSlice';
import allProductsSlice from '../../pages/allProductsSlice';
import filterSlice from '../../pages/filterSlice';
import createSagaMiddleware from 'redux-saga';
import detailsProductSaga from '../../pages/detailsProductSaga';
import detailsProductSlice from '../../pages/detailsProductSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    allProducts: allProductsSlice,
    filter: filterSlice,
    detailsProduct: detailsProductSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(detailsProductSaga);
