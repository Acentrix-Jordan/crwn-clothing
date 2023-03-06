import { useParams, Link } from "react-router-dom";

import "./category.style";
import {
	CategoryHeader,
	CategoryContainer,
	CategoryTitle,
} from "./category.style";

import ProductCard from "../../components/product-card/product-card.component";
import Button from "../../components/button/button.component";

import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

const Category = () => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);

	const products = categoriesMap[category];

	return (
		<>
			<CategoryHeader>
				<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
				<Link to="/shop">
					<Button
						content="Back to shop"
						buttonType="inverted"
					/>
				</Link>
			</CategoryHeader>
			<CategoryContainer>
				{products &&
					products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))}
			</CategoryContainer>
		</>
	);
};

export default Category;
