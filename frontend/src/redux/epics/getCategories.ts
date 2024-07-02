import {ofType} from 'redux-observable';
import {map, switchMap, retry, catchError} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';
import {Observable} from 'rxjs';
import {Action} from 'redux';
import { ProductCategory, setCategories } from '../reducers/categoriesSlice';

export const getCategories = (action$: Observable<Action>) => action$.pipe(
	ofType('getCategories'),
	switchMap(() => ajax.getJSON('http://localhost:7777/api/categories')
		.pipe(
			retry(10),
			map(categories => setCategories(categories as ProductCategory[])),
			catchError(error => {
				console.log(error);
				return of(error);
			}),
		)),
);
