import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
    productList : [],
    cartList : [],
    invoiceList : [],
    totalCost : 0,
    gstCost : 0,
    sum : 0
};
const productSlice = createSlice(
    {
        name : "productData",
        initialState : initialProductState,
        reducers :{
            updateProductList(state, action){
                state.productList = action.payload;
            },
            updateCartList(state, action){
                if(!action.payload){
                    return;
                }
                state.cartList = action.payload;
                console.log("state.cartList",state.cartList);
                state.totalCost = 0;
                Object.keys(state.cartList).map((key) =>{
                    let quantity = state.cartList[key] ;
                    console.log('state.productList[key].mrp',quantity);
                    let price = state.productList[key].mrp["$numberDecimal"]
                    state.totalCost = state.totalCost + price*quantity;

                })
                state.gstCost = ((state.totalCost / 100) * 18)
                console.log('state.gstCost',state.gstCost)
                console.log('state.totalCost',state.totalCost)
                state.sum =state.totalCost + state.gstCost;
                console.log('state.sum',state.sum)
            },addToCart(state, action){
                    if(state.cartList[action.payload]){
                        state.cartList[action.payload] = state.cartList[action.payload]+1;
                    }else{
                        state.cartList[action.payload] = 1;
                    }
                state.totalCost = 0;
                Object.keys(state.cartList).map((key) =>{
                    let quantity = state.cartList[key] ;
                    console.log('state.productList[key].mrp',quantity);
                    let price = state.productList[key].mrp["$numberDecimal"]
                    state.totalCost = state.totalCost + price*quantity;

                })
                state.gstCost = ((state.totalCost / 100) * 18)
                console.log(state.gstCost)
                state.sum =state.totalCost + state.gstCost;
            },removeFromCart(state, action){
                    if(state.cartList[action.payload]>1){
                        state.cartList[action.payload] = state.cartList[action.payload]-1;

                    }else if(state.cartList[action.payload]<=1){
                        delete state.cartList[action.payload];
                    }
                state.totalCost = 0;
                Object.keys(state.cartList).map((key) =>{
                    let quantity = state.cartList[key] ;
                    console.log('state.productList[key].mrp',quantity);
                    let price = state.productList[key].mrp["$numberDecimal"]
                    state.totalCost = state.totalCost + price*quantity;

                })
                state.gstCost = ((state.totalCost / 100) * 18)
                state.sum =state.totalCost + state.gstCost;
            },
            updateInvoiceList(state, action){
                if(!action.payload){
                    return;
                }
                state.invoiceList = action.payload;
                console.log(state.invoiceList);
            },
            refreshCart(state){
                state.cartList = [];
                state.sum = 0;
                state.gstCost = 0;
                state.totalCost = 0;
            }
        }
    }
)

export const productActions = productSlice.actions;
export default productSlice.reducer;