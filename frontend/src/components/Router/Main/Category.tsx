import { ProductCategory, categoryChosen, setChosenCategory } from "../../../redux/reducers/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

export default function Category({id, title}: ProductCategory) {
	const dispatch = useAppDispatch();
	const productsCategoryChosen = useAppSelector(categoryChosen);
	const categoryClassName = productsCategoryChosen === id ? 'nav-link active' : 'nav-link';

	function categoryClickEventHandler(event: { preventDefault: () => void; }) {
		event.preventDefault();
		dispatch(setChosenCategory(id));
	}

	return (
		<li className="nav-item" id={id.toString()}>
			<a className={categoryClassName}
				href="#"
				onClick={categoryClickEventHandler}>{title}</a>
		</li>
	);
}