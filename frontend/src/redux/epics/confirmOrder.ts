import { Action } from "redux";
import { tap, map, switchMap, retry, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of, Observable } from 'rxjs';
import { ofType } from "redux-observable";
import { clearCartProductList, setConfirmOrderIsError, setConfirmOrderIsLoading, setOwnerAddress, setOwnerIsAgreeWithDelivery, setOwnerPhone } from "../reducers/cartSlice";
import { store } from "../store";

export const confirmOrder = (action$: Observable<Action>) => action$.pipe(
    ofType('confirmOrder'),
    tap(() => {
        store.dispatch(setConfirmOrderIsLoading(true));
    }),
    switchMap(() => {
        const orderList = store.getState().cart.cartProductList;
        const ownerPhoneNumber = store.getState().cart.ownerPhone;
        const ownerContactAddress = store.getState().cart.ownerAddress;
        return ajax.post('http://localhost:7777/api/order', {
            'owner': {
                'phone': `${ownerPhoneNumber}`,
                'address': `${ownerContactAddress}`,
            },
            'items': orderList
        }, { 'Content-Type': 'application/json' })
            .pipe(
                retry(10),
                tap(() => {
                    store.dispatch(clearCartProductList());
                    store.dispatch(setOwnerPhone(''));
                    store.dispatch(setOwnerAddress(''));
                    store.dispatch(setOwnerIsAgreeWithDelivery(false));
                    store.dispatch(setConfirmOrderIsLoading(false));
                    store.dispatch(setConfirmOrderIsError(false));
                    window.sessionStorage.removeItem('bosaNoga');
                }),
                catchError(error => {
                    console.log(error);
                    store.dispatch(setConfirmOrderIsError(true));
                    return of(error);
                }),
            )
    }),
)