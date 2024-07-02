import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export interface ProductCategory {
    id: number,
    title: string
}

export interface CategoriesState {
    categoryList:ProductCategory[]
    categoryChosen: number;
}

export enum ProductCategoriesEnum {
    allShoes = 11,
	manShoes = 12,
	womenShoes = 13,
	unisexShoes = 14,
	kidsShoes = 15,
}

const initialState: CategoriesState = {
    categoryList: [],
    categoryChosen: ProductCategoriesEnum.allShoes,
}

export const categoriesSlice = createSlice({
    name: 'categoties',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ProductCategory[]>) => {
            state.categoryList = action.payload;
        },
        setChosenCategory: (state, action: PayloadAction<number>) => {
            state.categoryChosen= action.payload;
        }
    }
});

export const { setCategories, setChosenCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;

export const categories = (state: RootState) => state.categories.categoryList;
export const categoryChosen = (state: RootState) => state.categories.categoryChosen;