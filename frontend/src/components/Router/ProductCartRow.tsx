import getCurrencyFormat from 'extras/getCurrencyFormat';
import React from 'react'
import { ProductCart, deleteFromCartProductList } from '../../redux/reducers/cartSlice'
import { useAppDispatch } from '../../redux/store'

export const ProductCartRow = ({ id, title, size, price, count }: ProductCart, index: number) => {
    const dispatch = useAppDispatch();
    const productPrice = price ? getCurrencyFormat(price, 'RUB') : '';
	const productTotalPrice = price ? getCurrencyFormat(price * count, 'RUB') : '';

    function deleteCartProductEventHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        dispatch(deleteFromCartProductList(id));
    }
    return (
        <tr>
			<td scope="row">1</td>
			<td><a href={`catalog/${id}`}>{title}</a></td>
			<td>{size}</td>
			<td>{count}</td>
			<td>{productPrice}</td>
			<td>{productTotalPrice}</td>
			<td>
				<button className="btn btn-outline-danger btn-sm" onClick={deleteCartProductEventHandler}>Удалить</button>
			</td>
		</tr>
    )
}
