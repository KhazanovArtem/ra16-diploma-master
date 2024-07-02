import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export interface ProductSizeModel {
    size: string,
    available: boolean
}

export interface ProductModel {
    id: number,
    category?: number,
    title?: string,
    images?: string[],
    sku?: string,
    manufacturer?: string,
    color?: string,
    material?: string,
    reason?: string,
    season?: string,
    heelSize?: string,
    price?: number,
    oldPrice?: number,
    sizes?: ProductSizeModel[]
}

export interface ProductsState {
    topSales: ProductModel[],
    topSalesIsLoading: boolean,
    topSalesIsError: boolean,
    productsByCategory: ProductModel[];
    productsByCategoryIsLoading: boolean,
    productsByCategoryIsError: boolean,
	isCanLoadMode: boolean,
	letsLoadMoreProducts: boolean,
	productsSearchField: string,
	letsProductsSearch: boolean,
	isHeaderProductsSearchVisible: boolean,
	productId: number,
	product: ProductModel,
	productIsLoading: boolean,
	productIsError: boolean,
	selectedSize: string,
	productAmount: number,
}

const initialState: ProductsState = {
    topSales: [],
	topSalesIsLoading: false,
	topSalesIsError: false,
	productsByCategory: [],
	productsByCategoryIsLoading: false,
	productsByCategoryIsError: false,
	isCanLoadMode: false,
	letsLoadMoreProducts: false,
	productsSearchField: '',
	letsProductsSearch: false,
	isHeaderProductsSearchVisible: false,
	productId: -99,
	product: {id: -99},
	productIsLoading: false,
	productIsError: false,
	selectedSize: '',
	productAmount: 1,
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setTopSales: (state, action: PayloadAction<ProductModel[]>) => {
			state.topSales = action.payload;
		},
		setTopSalesIsLoading: (state, action: PayloadAction<boolean>) => {
			state.topSalesIsLoading = action.payload;
		},
		setTopSalesIsError: (state, action: PayloadAction<boolean>) => {
			state.topSalesIsError = action.payload;
		},
		setProductsByCategory: (state, action: PayloadAction<ProductModel[]>) => {
			state.productsByCategory = action.payload;
		},
		addProductsByCategory: (state, action: PayloadAction<ProductModel[]>) => {
			state.productsByCategory = [...state.productsByCategory, ...action.payload];
		},
		setProductsByCategoryIsLoading: (state, action: PayloadAction<boolean>) => {
			state.productsByCategoryIsLoading = action.payload;
		},
		setProductsByCategoryIsError: (state, action: PayloadAction<boolean>) => {
			state.productsByCategoryIsError = action.payload;
		},
		setIsCanLoadMore: (state, action: PayloadAction<boolean>) => {
			state.isCanLoadMode = action.payload;
		},
		setLetsLoadMoreProducts: (state, action: PayloadAction<boolean>) => {
			state.letsLoadMoreProducts = action.payload;
		},
		setProductsSearchField: (state, action: PayloadAction<string>) => {
			state.productsSearchField = action.payload;
		},
		setLetsProductsSearch: (state, action: PayloadAction<boolean>) => {
			state.letsProductsSearch = action.payload;
		},
		setIsHeaderProductsSearchVisible: (state, action: PayloadAction<boolean>) => {
			state.isHeaderProductsSearchVisible = action.payload;
		},
		setProductId: (state, action: PayloadAction<number>) => {
			state.productId = action.payload;
		},
		setProduct: (state, action: PayloadAction<ProductModel>) => {
			state.product = action.payload;
		},
		setProductIsLoading: (state, action: PayloadAction<boolean>) => {
			state.productIsLoading = action.payload;
		},
		setProductIsError: (state, action: PayloadAction<boolean>) => {
			state.productIsError = action.payload;
		},
		setSelectedSize: (state, action: PayloadAction<string>) => {
			state.selectedSize = action.payload;
		},
		setProductAmount: (state, action: PayloadAction<number>) => {
			state.productAmount = action.payload;
		},
    }
})

export const {
    setTopSales,
	setTopSalesIsLoading,
	setTopSalesIsError,
	setProductsByCategory,
	addProductsByCategory,
	setProductsByCategoryIsLoading,
	setProductsByCategoryIsError,
	setIsCanLoadMore,
	setLetsLoadMoreProducts,
	setProductsSearchField,
	setLetsProductsSearch,
	setIsHeaderProductsSearchVisible,
	setProductId,
	setProduct,
	setProductIsLoading,
	setProductIsError,
	setSelectedSize,
	setProductAmount,
} = productsSlice.actions;

export default productsSlice.reducer;

export const topSales = (state: RootState) => state.products.topSales;
export const topSalesIsLoading = (state: RootState) => state.products.topSalesIsLoading;
export const topSalesIsError = (state: RootState) => state.products.topSalesIsError;
export const productsByCategory = (state: RootState) => state.products.productsByCategory;
export const productsByCategoryIsLoading = (state: RootState) => state.products.productsByCategoryIsLoading;
export const productsByCategoryIsError = (state: RootState) => state.products.productsByCategoryIsError;
export const isCalLoadMore = (state: RootState) => state.products.isCanLoadMode;
export const letsLoadMoreProducts = (state: RootState) => state.products.letsLoadMoreProducts;
export const productsSearchField = (state: RootState) => state.products.productsSearchField;
export const letsProductsSearch = (state: RootState) => state.products.letsProductsSearch;
export const isHeaderProductsSearchVisible = (state: RootState) => state.products.isHeaderProductsSearchVisible;
export const productId = (state: RootState) => state.products.productId;
export const product = (state: RootState) => state.products.product;
export const productIsLoading = (state: RootState) => state.products.productIsLoading;
export const productIsError = (state: RootState) => state.products.productIsError;
export const selectedSize = (state: RootState) => state.products.selectedSize;
export const productAmount = (state: RootState) => state.products.productAmount;