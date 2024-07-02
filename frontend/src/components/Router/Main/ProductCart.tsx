import getCurrencyFormat from "extras/getCurrencyFormat";
import { useNavigate } from "react-router-dom";
import { ProductModel, setProductId } from "../../../redux/reducers/productsSlice";
import { useAppDispatch } from "../../../redux/store";

export default function ProductCard({id, images, title, price}: ProductModel) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const productImage = images && images?.length > 0 ?  images[0] : '';
	const productPrice = price ? getCurrencyFormat(price, 'RUB') : '';

	function toProductClickEventHandler(event: React.MouseEvent<HTMLAnchorElement>) {
		event.preventDefault();
		navigate(`/catalog/${id}`);
		dispatch(setProductId(id));
	}

	return (
		<div className="col-4">
			<div className="card">
				<img src={productImage}
					className="card-img-top img-fluid img-product" alt={title} />
				<div className="card-body">
					<p className="card-text product-name">{title}</p>
					<p className="card-text">{productPrice}</p>
					<a href={id.toString()} className="btn btn-outline-primary" onClick={toProductClickEventHandler}>Заказать</a>
				</div>
			</div>
		</div>
	);
}