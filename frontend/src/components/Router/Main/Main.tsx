import { setIsHeaderProductsSearchVisible, setProductsSearchField } from "../../../redux/reducers/productsSlice";
import { useAppDispatch } from "../../../redux/store"
import { ProductsCatalog } from "../ProductsCatalog";
import  TopSales  from "./TopSales";


export const Main = () => {
  const dispatch = useAppDispatch();
  dispatch(setProductsSearchField(''));
  dispatch(setIsHeaderProductsSearchVisible(true));

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={require('../../../img/banner.jpg')} className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <TopSales />
          <ProductsCatalog isSearchField={false} />
        </div>
      </div>
    </main>
  )
}
