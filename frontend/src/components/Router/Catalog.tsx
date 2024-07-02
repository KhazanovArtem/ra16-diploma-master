import { setIsHeaderProductsSearchVisible } from "../../redux/reducers/productsSlice";
import { useAppDispatch } from "../../redux/store"
import { ProductsCatalog } from "./ProductsCatalog";



export const Catalog = () => {
  const dispatch = useAppDispatch();
  dispatch(setIsHeaderProductsSearchVisible(true));

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img src={require('../../img/banner.jpg')} className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <ProductsCatalog isSearchField={true}/>
        </div>
      </div>
    </main>
  )
}
