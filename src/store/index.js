import { configureStore } from '@reduxjs/toolkit';
import productReducer from './product';

const store = configureStore({
    reducer : { productData : productReducer}
});

export default store;
