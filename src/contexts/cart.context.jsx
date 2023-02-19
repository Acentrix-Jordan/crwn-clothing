import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
	// Find if cartItems contains productToAdd
	const exisitingCartItem = cartItems.find((cartItem) => {
		return cartItem.id === productToAdd.id;
	});

	// If Found, increment quantity
	if (exisitingCartItem) {
		return cartItems.map((cartItem) => {
			return cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem;
		});
	}
	// Return new array with modified cartItems / new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
	// Find the cart item to remove
	const exisitingCartItem = cartItems.find((cartItem) => {
		return cartItem.id === cartItemToRemove.id;
	});

	// if Quantity = 1 remove
	if (exisitingCartItem.quantity == 1) {
		return cartItems.filter(
			(cartItem) => cartItem.id != cartItemToRemove.id
		);
	}
	// return cartItems with matching cart items with reduced quantity

	return cartItems.map((cartItem) => {
		return cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem;
	});
};

const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter((cartItem) => cartItem.id != cartItemToClear.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	totalCartItems: 0,
	cartTotal: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalCartItems, setTotalCartItems] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemFromCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove));
	};

	const clearItemFromCart = (cartItemToClear) => {
		setCartItems(clearCartItem(cartItems, cartItemToClear));
	};

	// Total Cart Items
	useEffect(() => {
		const calculateTotalCartItems = cartItems.reduce((total, cartItem) => {
			return total + cartItem.quantity;
		}, 0);

		setTotalCartItems(calculateTotalCartItems);
	}, [cartItems]);

	// Calculate Cart Total (£)
	useEffect(() => {
		const newCartTotal = cartItems.reduce((total, cartItem) => {
			return total + cartItem.quantity * cartItem.price;
		}, 0);

		setCartTotal(newCartTotal);
	}, [cartItems]);

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartItems,
		totalCartItems,
		cartTotal,
	};
	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};
