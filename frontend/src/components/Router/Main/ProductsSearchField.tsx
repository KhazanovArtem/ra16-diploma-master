import { productsSearchField, setLetsProductsSearch, setProductsSearchField } from "../../../redux/reducers/productsSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

export default function ProductsSearchField() {
    const dispatch = useAppDispatch();
    const productsSearchFieldInput = useAppSelector(productsSearchField);

    function productsSearchFieldInputEvenHandler(event: React.ChangeEvent<HTMLInputElement>) {
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
        <form className="catalog-search-form form-inline">
			<input 
				className="form-control" 
				placeholder="Поиск"
				onChange={productsSearchFieldInputEvenHandler}
				onKeyDown={letsProductsSearchEventHandler}
				value={productsSearchFieldInput}/>
		</form>
    )
}