import { Block, CheckoutContainer, Header, Total } from "./checkout.style";

// Context
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
	const { cartItems, cartTotal } = useContext(CartContext);

	return (
		<CheckoutContainer>
			<h1>Checkout</h1>
			<Header>
				<Block>
					<span>Product</span>
				</Block>
				<Block>
					<span>Description</span>
				</Block>
				<Block>
					<span>Quantity</span>
				</Block>
				<Block>
					<span>Price</span>
				</Block>
				<Block>
					<span>Remove</span>
				</Block>
			</Header>
			{cartItems.map((cartItem) => {
				return (
					<CheckoutItem
						key={cartItem.id}
						cartItem={cartItem}
					/>
				);
			})}
			<Total>Total: £{cartTotal}</Total>
		</CheckoutContainer>
	);
};

export default Checkout;
