import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useNavigate } from "react-router-dom"
import { headerNavigationLinks } from "../../redux/reducers/navigationLinksSlice"
import { isHeaderProductsSearchVisible, productsSearchField, setIsHeaderProductsSearchVisible } from "../../redux/reducers/productsSlice"
import { cartProductList } from "../../redux/reducers/cartSlice"
import { NavigationLinkType } from "../../redux/reducers/navigationLinksSlice"
import { NavigationLink } from "../NavigationLink"
import { ProductSearchField } from "./ProductSearchField"

// export interface NavigationLinks {
//   links: NavigationLinkType[];
// }

// const NavigationLinks = {
//   links: [
//     { name: "Главная", url: "/", isActive: true },
//     { name: "О магазине", url: "about", isActive: false },
//     { name: "Каталог", url: "catalog", isActive: false },
//     { name: "Контакты", url: "contacts", isActive: false },
//   ]
// }

export const Header = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const headerNavigationLinksList = useAppSelector(headerNavigationLinks);
  const isProductsSearchVisible = useAppSelector(isHeaderProductsSearchVisible);
  const productsSearchFieldInput = useAppSelector(productsSearchField);
  const cartProducts = useAppSelector(cartProductList);

  function searchHeaderEventHandler() {
    dispatch(setIsHeaderProductsSearchVisible(!isProductsSearchVisible));
    if (!isProductsSearchVisible && productsSearchFieldInput.length > 0) {
      nav('/catalog');
    }
  };

  function navigateToCart(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    nav('/cart');
  }
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src={require('../../img/header-logo.png')} alt="Bosa Noga" />
            </a>
            <div className="collapse navbar-collapse" id='navbarMain'>
              <ul className="navbar-nav mr-auto">
                {headerNavigationLinksList.map((link: NavigationLinkType, index: number) => {
                  return <NavigationLink url={link.url} name={link.name} isActive={link.isActive} key={index} />
                })}
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id='search-expander' className='header-controls-pic header-controls-search' onClick={searchHeaderEventHandler}></div>
                  <div className='header-controls-pic header-controls-cart' onClick={navigateToCart}>
                    <div className='header-controls-cart-full'>{cartProducts.length}</div>
                    <div className='header-controls-cart-menu'></div>
                  </div>
                </div>
                <ProductSearchField/>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
