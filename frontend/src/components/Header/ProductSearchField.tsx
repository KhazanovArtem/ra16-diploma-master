import { isHeaderProductsSearchVisible, productsSearchField, setLetsProductsSearch, setProductsSearchField } from "../../redux/reducers/productsSlice";
import { useAppSelector, useAppDispatch } from "../../redux/store"


export const ProductSearchField = () => {
  const dispatch = useAppDispatch();
  const productsSearchFieldInput = useAppSelector(productsSearchField);
  const isProductsSearchVisible = useAppSelector(isHeaderProductsSearchVisible);
	const formClassName = isProductsSearchVisible ?
		'header-controls-search-form form-inline invisible' :
		'header-controls-search-form form-inline';

  function productsSearchFieldInputEventHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const value = event.currentTarget.value;
    dispatch(setProductsSearchField(value));
  }

  function letsProductsSearchEventHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      dispatch(setLetsProductsSearch(true));
    }
  } 


  return (
    <form data-id='search-form' className={formClassName}>
			<input 
				className="form-control" 
				placeholder="Поиск"
				onChange={productsSearchFieldInputEventHandler}
				onKeyDown={letsProductsSearchEventHandler}
				value={productsSearchFieldInput}/>
		</form>
  )
}
