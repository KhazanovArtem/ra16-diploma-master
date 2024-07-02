import arrayToChunksArray from "extras/arrayToChunksArray";
import { useEffect } from "react";
import { categoryChosen } from "../../redux/reducers/categoriesSlice";
import { isCalLoadMore, letsLoadMoreProducts, letsProductsSearch, productsByCategory, productsByCategoryIsLoading, setLetsLoadMoreProducts } from "../../redux/reducers/productsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store"
import ProductsSearchField from "./Main/ProductsSearchField";
import { nanoid } from "@reduxjs/toolkit";
import CategoryList from "./Main/CategoryList";
import MainPreloader from "extras/MainPreloader";
import ProductCard from "./Main/ProductCart";


export const ProductsCatalog = ({ isSearchField } : any) => {
  const dispatch = useAppDispatch();
  const productsByCategoryList = useAppSelector(productsByCategory);
  const productsByCategoryListIsLoading = useAppSelector(productsByCategoryIsLoading);
  const productsCategoryChosen = useAppSelector(categoryChosen);
  const isCanLoadProductsMore = useAppSelector(isCalLoadMore);
  const letsLoadMoreCatalogProducts = useAppSelector(letsLoadMoreProducts);
  const letsSearchProducts = useAppSelector(letsProductsSearch);

  let productsByCategoryChunks = arrayToChunksArray(productsByCategoryList, 3);

  function loadMoreProductsClickEventHandler(event: { preventDefault: () => void; }) {
    event.preventDefault();
    dispatch(setLetsLoadMoreProducts(true));
  }

  useEffect(() => {
    dispatch({ type: 'getProductsByCategories' });
    dispatch({ type: 'getCategories' });
  }, []);

  useEffect(() => {
    dispatch({ type: 'getProductsByCategories' });
    productsByCategoryChunks = arrayToChunksArray(productsByCategoryList, 3);
  }, [productsCategoryChosen]);

  useEffect(() => {
    if (letsLoadMoreCatalogProducts) {
      dispatch({ type: 'getProductsByCategories' });
      productsByCategoryChunks = arrayToChunksArray(productsByCategoryList, 3);
    }
  }, [letsLoadMoreCatalogProducts]);

  useEffect(() => {
    if (letsSearchProducts) {
      dispatch({ type: 'getProductsByCategories' });
      productsByCategoryChunks = arrayToChunksArray(productsByCategoryList, 3);
    }
  }, [letsSearchProducts]);



  return (
    <section className="catalog">
			<h2 className="text-center">Каталог</h2>
			{isSearchField && <ProductsSearchField />}
			<CategoryList />
			{productsByCategoryListIsLoading && <MainPreloader/>}
			{productsByCategoryChunks.length > 0 &&
				productsByCategoryChunks.map(chunk =>
					<div className="row m-2" key={nanoid()}>
						{chunk.map(product => <ProductCard
							key={product.id}
							id={product.id}
							images={product.images}
							title={product.title}
							price={product.price}
						/>)}
					</div>
				)
			}
			{isCanLoadProductsMore &&
				<div className="text-center">
					<button
						className="btn btn-outline-primary"
						onClick={loadMoreProductsClickEventHandler}>Загрузить ещё</button>
				</div>}
		</section>
  )
}
