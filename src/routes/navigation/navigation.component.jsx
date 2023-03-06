import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Styles and Assets
// import "./navigation.style.scss";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import {
	LogoContainer,
	NavigationContainer,
	NavLink,
	NavLinks,
} from "./navigation.style.jsx";

// Components
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

// Context
import { CartContext } from "../../contexts/cart.context";

// Auth Helper Functions
import { signOutAuthUser } from "../../utils/firebase/firebase.utils.js";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);
	const { isCartOpen } = useContext(CartContext);

	return (
		<>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrwnLogo />
				</LogoContainer>
				<NavLinks>
					<NavLink to="/shop">Shop</NavLink>
					{currentUser ? (
						<NavLink
							as="span"
							onClick={signOutAuthUser}
						>
							Sign Out
						</NavLink>
					) : (
						<NavLink to="/auth">Sign In</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</>
	);
};

export default Navigation;
