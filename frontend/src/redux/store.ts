import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import navigationLinksSlice from "./reducers/navigationLinksSlice";
import productsSlice from "./reducers/productsSlice";
import cartSlice from "./reducers/cartSlice";
import categoriesSlice from "./reducers/categoriesSlice";
import { getTopSales } from "./epics/getTopSales";
import { getProductsByCategories } from "./epics/getProductsByCategories";
import { getCategories } from "./epics/getCategories";
import { getProduct } from "./epics/getProduct";
import { confirmOrder } from "./epics/confirmOrder";

const epicMiddleWare = createEpicMiddleware();
export const rootEpic = combineEpics(
    getTopSales,
	getProductsByCategories,
	getCategories,
	getProduct,
	confirmOrder
);

export const store = configureStore({
    reducer: {
        navigationLinks: navigationLinksSlice,
		products: productsSlice,
        cart: cartSlice,
        categories: categoriesSlice
    },
    middleware: getDefaultMiddleWare => getDefaultMiddleWare({
        thunk: false,
        serializableCheck: false,
    }).concat(epicMiddleWare)
});

epicMiddleWare.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

