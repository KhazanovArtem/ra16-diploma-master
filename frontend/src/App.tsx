import { Footer } from "components/Footer";
import { Header } from "components/Header/Header";
import { Routing } from "components/Router/Routing";
import { ProductCart, clearCartProductList, setCartProductList } from "./redux/reducers/cartSlice";
import { useAppDispatch } from "./redux/store";


function App() {
  const dispatch = useAppDispatch();

	const cartProducts =
		(JSON.parse(window.sessionStorage.getItem('bosaNoga') ?? '[]'));
	if (cartProducts && cartProducts.length > 0) {
		dispatch(clearCartProductList());
		cartProducts.forEach((product: ProductCart) => dispatch(setCartProductList(product as ProductCart)));
	}
  
  return (
    <>
      <Header />
      <Routing />
      <Footer />
    </>
  );
}

export default App;
