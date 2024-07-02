import getCurrencyFormat from 'extras/getCurrencyFormat';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { cartProductList, ownerAddress, ownerIsAgreeWithDelivery, ownerPhone, setOwnerAddress, setOwnerIsAgreeWithDelivery, setOwnerPhone } from '../../redux/reducers/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ProductCartRow } from './ProductCartRow';

export const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartProducts = useAppSelector(cartProductList);
  const ownerPhoneNumber = useAppSelector(ownerPhone);
  const ownerContactAddress = useAppSelector(ownerAddress);
  const isOwnerAgreeWithDelivery = useAppSelector(ownerIsAgreeWithDelivery);
  const totalPrice = cartProducts.reduce((prevProduct, currProduct) => {
    return prevProduct + currProduct.count * currProduct.price;
  }, 0);
  const totalProductsPrice = totalPrice ? getCurrencyFormat(totalPrice, 'RUB') : '';
  const orderButtonClassName =
    ownerPhoneNumber.length > 0 &&
      ownerContactAddress.length > 0 &&
      cartProducts.length > 0 &&
      isOwnerAgreeWithDelivery ? 'btn btn-outline-secondary' : 'btn btn-outline-secondary disabled';

  function ownerPhoneInputEventHandler(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    dispatch(setOwnerPhone(event.currentTarget.value));
  }

  function ownerAddressInputEventHandler(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    dispatch(setOwnerAddress(event.currentTarget.value));
  }

  function ownerisAgreeWithDeliveryInputEventHandler(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    dispatch(setOwnerIsAgreeWithDelivery(event.currentTarget.checked));
  }

  function confirmOrderClickEventHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (
      ownerPhoneNumber.length > 0 &&
      ownerContactAddress.length > 0 &&
      cartProducts.length > 0 &&
      isOwnerAgreeWithDelivery
    ) {
      dispatch({ type: 'confirmOrder' });
      navigate('/');
    }
  }

  return (
    <main className='container'>
      <div className='row'>
        <div className='col'>
          <div className='banner'>
            <img src={require('../../img/banner.jpg')} className='img-fluid' alt="К весне готовы!" />
            <h2 className='banner-header'>К весне готовы!</h2>
          </div>
          <section className='cart'>
            <h2 className='text-center'>Корзина</h2>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Название</th>
                  <th scope='col'>Размер</th>
                  <th scope='col'>Кол-во</th>
                  <th scope='col'>Стоимость</th>
                  <th scope='col'>Итого</th>
                  <th scope='col'>Действия</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map(product => <ProductCartRow
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  size={product.size}
                  price={product.price}
                  count={product.count} />)}
                <tr>
                  <td colSpan={5} className='text-right'>Общая стоимость</td>
                  <td>{totalProductsPrice}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card cart-card">
              <form className="card-body">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input className="form-control" id="phone" placeholder="Ваш телефон" value={ownerPhoneNumber} onInput={ownerPhoneInputEventHandler} />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input className="form-control" id="address" placeholder="Адрес доставки" value={ownerContactAddress} onInput={ownerAddressInputEventHandler} />
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="agreement" onInput={ownerisAgreeWithDeliveryInputEventHandler} />
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button type="submit" className={orderButtonClassName} onClick={confirmOrderClickEventHandler}>Оформить</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
