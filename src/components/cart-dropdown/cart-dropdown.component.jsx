import {
	CartDropdownContainer,
	CartDropdownItems,
	EmptyMessage,
} from "./cart-dropdown.style.jsx";
import { useNavigate } from "react-router-dom";

// Context
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

// Components
import CartItem from "../cart-item/cart-item.component";
import CustomButton, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate("/checkout");
	};

	return (
		<CartDropdownContainer>
			<CartDropdownItems>
				{cartItems.length ? (
					cartItems.map((item) => (
						<CartItem
							key={item.id}
							cartItem={item}
						/>
					))
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartDropdownItems>
			<CustomButton
				content="GO TO CHECKOUT"
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={goToCheckoutHandler}
			/>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
