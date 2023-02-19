import styled from "styled-components";

export const CategoryHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
	margin-bottom: 1.5rem;
`;

export const CategoryTitle = styled.h2`
	font-size: 38px;
`;

export const CategoryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1.25rem;
	row-gap: 3rem;
`;
