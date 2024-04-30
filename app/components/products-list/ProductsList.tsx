import ProductItem from "~/components/product-item/ProductItem";

import type { productsListProps } from "~/components/products-list/ProductsList.types";

import { ProductListWrapper } from "~/components/products-list/ProductsList.styles";

const productsList = ({ products }: productsListProps) => {
    return (
        <ProductListWrapper>
            {products.map((item) => {
                return <ProductItem key={item.id} item={item} />;
            })}
        </ProductListWrapper>
    );
};

export default productsList;
