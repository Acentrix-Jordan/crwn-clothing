import { ProductCardContainer, ProductCardFooter } from "./product-card.style";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addItemToCart } = useContext(CartContext);

	const addProductToCart = () => addItemToCart(product);

	return (
		<ProductCardContainer>
			<img
				src={imageUrl}
				alt={`Picture of ${name}`}
			/>
			<ProductCardFooter>
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</ProductCardFooter>
			<Button
				buttonType="inverted"
				content="Add to Cart"
				onClick={addProductToCart}
			/>
		</ProductCardContainer>
	);
};

export default ProductCard;
