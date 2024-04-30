import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import ProductDetails, { action } from "~/routes/product";

import { getProduct } from "~/model/products";

export const loader: LoaderFunction = ({ params }) => {
    const productId = params.id;

    if (typeof productId === "undefined") {
        throw new Error("The server could not get the product");
    }

    return json({ product: getProduct(productId) });
};

export { action };
const ProductId = () => {
    const { product } = useLoaderData<typeof loader>();
    return <ProductDetails product={product} />;
};

export default ProductId;
