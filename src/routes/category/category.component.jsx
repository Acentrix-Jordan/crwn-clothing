import { useParams, Link } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../contexts/categories.context";

import "./category.style";
import {
	CategoryHeader,
	CategoryContainer,
	CategoryTitle,
} from "./category.style";

import ProductCard from "../../components/product-card/product-card.component";
import Button from "../../components/button/button.component";

const Category = () => {
	const { category } = useParams();
	const { categoriesMap } = useContext(CategoriesContext);

	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

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
