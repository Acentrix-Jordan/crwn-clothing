import { CartItemContainer, CartItemDetails } from "./cart-item.style";

const CartItem = ({ cartItem }) => {
	const { name, quantity, imageUrl, price } = cartItem;
	return (
		<CartItemContainer>
			<img
				src={imageUrl}
				alt={name}
			/>
			<CartItemDetails>
				<span>{name}</span>
				<span>
					{quantity} X £{price}
				</span>
			</CartItemDetails>
		</CartItemContainer>
	);
};

export default CartItem;
