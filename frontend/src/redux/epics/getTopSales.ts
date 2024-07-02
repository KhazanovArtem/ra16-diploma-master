import {ofType} from 'redux-observable';
import { tap, map, switchMap, retry, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of, Observable } from 'rxjs';
import { Action } from 'redux';
import { ProductModel, setTopSales, setTopSalesIsError, setTopSalesIsLoading } from '../reducers/productsSlice';
import { store } from "../store";

export const getTopSales = (action$: Observable<Action>) => action$.pipe(
	ofType('getTopSales'),
	tap(() => {
		store.dispatch(setTopSalesIsLoading(true));
	}),
	switchMap(() => ajax.getJSON('http://localhost:7777/api/top-sales')
		.pipe(
			retry(10),
			map(topSales => setTopSales(topSales as ProductModel[])),
			tap(() => {
				store.dispatch(setTopSalesIsLoading(false));
				store.dispatch(setTopSalesIsError(false));
			}),
			catchError(error => {
				console.log(error);
				store.dispatch(setTopSalesIsError(true));
				return of(error);
			}),
		)),
);