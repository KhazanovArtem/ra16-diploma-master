import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export interface ProductCart {
    id: number;
    title: string;
    size: string;
    price: number;
    count: number;
}

export interface CartState {
    ownerPhone: string;
    ownerAddress: string;
    ownerIsAgreeWithDelivery: boolean;
    cartProductList: ProductCart[];
    confirmOrderIsLoading: boolean;
    confirmOrderIsError: boolean;
}

const initialState: CartState = {
    ownerPhone: '',
    ownerAddress: '',
    ownerIsAgreeWithDelivery: false,
    cartProductList: [],
    confirmOrderIsLoading: false,
    confirmOrderIsError: false,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setOwnerPhone: (state, action: PayloadAction<string>) => {
            state.ownerPhone = action.payload;
        },
        setOwnerAddress: (state, action: PayloadAction<string>) => {
            state.ownerAddress = action.payload;
        },
        setOwnerIsAgreeWithDelivery: (state, action: PayloadAction<boolean>) => {
            state.ownerIsAgreeWithDelivery = action.payload;
        },
        setCartProductList: (state, action: PayloadAction<ProductCart>) => {
            const newProduct = action.payload;
            let isProductExist = false;
            const cartProductList = state.cartProductList.map(item => {
                if (item.id === newProduct.id &&
                    item.size === newProduct.size &&
                    item.price === newProduct.price) {
                        item.count += newProduct.count;
                        isProductExist = true;
                }
                return item;
            });
            if (isProductExist) {
                state.cartProductList = cartProductList;
                isProductExist = false;
            } else {
                state.cartProductList = [...state.cartProductList, ...[newProduct]];
            }
            window.sessionStorage.setItem('bosaNoga', JSON.stringify([...state.cartProductList]));   
        },
        clearCartProductList: (state) => {
            state.cartProductList = [];
        },
        deleteFromCartProductList: (state, action: PayloadAction<number>) => {
            state.cartProductList = state.cartProductList.filter(item => item.id !== action.payload);
            window.sessionStorage.setItem('bosaNoga', JSON.stringify([...state.cartProductList]));
        },
        setConfirmOrderIsLoading: (state, action: PayloadAction<boolean>) => {
			state.confirmOrderIsLoading = action.payload;
		},
		setConfirmOrderIsError: (state, action: PayloadAction<boolean>) => {
			state.confirmOrderIsError = action.payload;
        },
    }
});

export const {
	setCartProductList,
	deleteFromCartProductList,
	setOwnerPhone,
	setOwnerAddress,
	setOwnerIsAgreeWithDelivery,
	clearCartProductList,
	setConfirmOrderIsLoading,
	setConfirmOrderIsError,
} = cartSlice.actions;
export default cartSlice.reducer;

export const cartProductList = (state: RootState) => state.cart.cartProductList;
export const ownerPhone = (state: RootState) => state.cart.ownerPhone;
export const ownerAddress = (state: RootState) => state.cart.ownerAddress;
export const ownerIsAgreeWithDelivery = (state: RootState) => state.cart.ownerIsAgreeWithDelivery;