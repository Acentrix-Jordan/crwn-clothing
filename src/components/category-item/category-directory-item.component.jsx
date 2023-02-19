import {
	BackgroundImage,
	Body,
	CategoryDirectoryItemContainer,
} from "./category-directory-item.style";

import { useNavigate } from "react-router-dom";

const CategoryDirectoryItem = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => {
		navigate(route);
	};

	return (
		<CategoryDirectoryItemContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</CategoryDirectoryItemContainer>
	);
};

export default CategoryDirectoryItem;
