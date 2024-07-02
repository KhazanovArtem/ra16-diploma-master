import {ofType} from 'redux-observable';
import {tap, map, switchMap, retry, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of, Observable} from 'rxjs';
import { store } from "../store";
import { Action } from 'redux';
import { ProductModel, addProductsByCategory, setIsCanLoadMore, setLetsLoadMoreProducts, setLetsProductsSearch, setProductsByCategory, setProductsByCategoryIsError, setProductsByCategoryIsLoading } from '../reducers/productsSlice';
import { ProductCategoriesEnum } from '../reducers/categoriesSlice';

export const getProductsByCategories = (action$: Observable<Action>) => action$.pipe(
	ofType('getProductsByCategories'),
	tap(() => {
		store.dispatch(setProductsByCategoryIsLoading(true));
	}),
	switchMap(action => {
		const chosenCategory = store.getState().categories.categoryChosen;
		const productsWithCategories = store.getState().products.productsByCategory;
		const letsLoadMoreProducts = store.getState().products.letsLoadMoreProducts;
		const productsSearchField = store.getState().products.productsSearchField;
		let url = 'http://localhost:7777/api/items';
		let urlParams = '';

		if (chosenCategory && chosenCategory !== ProductCategoriesEnum.allShoes) {
			urlParams += `?categoryId=${chosenCategory}`;
		}

		if (letsLoadMoreProducts) {
			if (urlParams.length > 0) {
				urlParams += `&offset=${productsWithCategories.length}`;
			} else {
				urlParams = `?offset=${productsWithCategories.length}`;
			}
		}

		if (productsSearchField && productsSearchField.length > 0) {
			if (urlParams.length > 0) {
				urlParams += `&q=${productsSearchField}`;
			} else {
				urlParams = `?q=${productsSearchField}`;
			}
		}

		url += urlParams;
		return ajax.getJSON(url)
			.pipe(
				retry(10),
				map(products => {
					const productsByCategories = products as ProductModel[];
					if (productsByCategories.length === 6) {
						store.dispatch(setIsCanLoadMore(true));
					} else {
						store.dispatch(setIsCanLoadMore(false));
					}
					if (letsLoadMoreProducts) {
						return addProductsByCategory(productsByCategories);
					} else {
						return setProductsByCategory(productsByCategories);
					}
				}),
				tap(() => {
					store.dispatch(setProductsByCategoryIsLoading(false));
					store.dispatch(setProductsByCategoryIsError(false));
					store.dispatch(setLetsLoadMoreProducts(false));
					store.dispatch(setLetsProductsSearch(false));
				}),
				catchError(error => {
					console.log(error);
					store.dispatch(setProductsByCategoryIsError(true));
					store.dispatch(setLetsLoadMoreProducts(false));
					store.dispatch(setLetsProductsSearch(false));
					return of(error);
				}),
			);
	}
	),
);