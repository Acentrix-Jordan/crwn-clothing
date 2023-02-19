import {
	CartIconContainer,
	CartItemCount,
	ShoppingIcon,
} from "./cart-icon.style";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
	const { setIsCartOpen, isCartOpen, totalCartItems } =
		useContext(CartContext);

	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon />
			<CartItemCount>{totalCartItems}</CartItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
