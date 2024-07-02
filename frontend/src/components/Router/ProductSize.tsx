import { selectedSize, setSelectedSize } from "../../redux/reducers/productsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export default function ProductSize(props: { size: any; }) {
	const {size} = props;
	const dispatch = useAppDispatch();
	const selectedProductSize = useAppSelector(selectedSize);
	const productSizeClassname = selectedProductSize === size ? 'catalog-item-size selected' : 'catalog-item-size';

	function productSizeEventHandler(event: { preventDefault: () => void; }) {
		event.preventDefault();
		if (size === selectedProductSize) {
			dispatch(setSelectedSize(''));
		} else {
			dispatch(setSelectedSize(size));
		}
	}

	return (
		<span className={productSizeClassname} onClick={productSizeEventHandler}>{size}</span>
	);
}