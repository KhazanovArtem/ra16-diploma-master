import {ofType} from 'redux-observable';
import {tap, map, switchMap, retry, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { store } from "../store";
import { ProductModel, setProduct, setProductIsError, setProductIsLoading } from '../reducers/productsSlice';

export const getProduct = (action$: Observable<Action>) => action$.pipe(
	ofType('getProduct'),
	tap(() => {
		store.dispatch(setProductIsLoading(true));
	}),
	switchMap(action => {
		const productId = store.getState().products.productId;
		const url = 'http://localhost:7777/api/items/' + productId;
		return ajax.getJSON(url)
			.pipe(
				retry(10),
				map(product => store.dispatch(setProduct(product as ProductModel))),
				tap(() => {
					store.dispatch(setProductIsLoading(false));
					store.dispatch(setProductIsError(false));
				}),
				catchError(error => {
					console.log(error);
					store.dispatch(setProductIsError(false));
					return of(error);
				}),
			);
	}
	),
);