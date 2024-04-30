import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import ProductsList from "~/components/products-list/ProductsList";

import type { TSort } from "~/types/model.type";

import {
    getCategories,
    getProducts,
    getProductsByParams,
    getSortOptions,
} from "~/model/products";

import {
    FilterBar,
    SelectedCategory,
    DropPanel,
    Span,
    FilterOptions,
    SortOptions,
} from "./Shopping.styles";

export const meta: MetaFunction = ({ data, params }) => {
    const category = params["*"];

    if (!data) {
        return {
            title: "Missing Shopping",
            description: `The is no products with the category "${category}"`,
        };
    }

    return {
        title: category ? `Shopping - ${category}` : "Shopping",
        description: "This is a real shopping page!!",
    };
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const sortBy = Object.fromEntries(url.searchParams)?.sort;
    const categories = params["*"];
    const productsList = categories
        ? getProductsByParams({ category: categories }, sortBy)
        : getProducts(sortBy);

    return json({
        sortBy: getSortOptions(),
        categories: getCategories(),
        productsList: productsList,
    });
};

const selectedCategory = "";

const Shopping = () => {
    const { sortBy, categories, productsList } = useLoaderData<typeof loader>();

    return (
        <main>
            <FilterBar>
                <DropPanel>
                    <Span>Filter by</Span>
                    <SelectedCategory>{selectedCategory}</SelectedCategory>
                    <FilterOptions>
                        <li key="all">
                            <Link to={"/shopping"}>All</Link>
                        </li>
                        {categories.map((category: string) => (
                            <li key={category}>
                                <Link to={category}>{category}</Link>
                            </li>
                        ))}
                    </FilterOptions>
                </DropPanel>
                <DropPanel>
                    <Span>Sort by</Span>
                    <SortOptions>
                        <li key="recommended">
                            <Link to={selectedCategory}>Recommended</Link>
                        </li>
                        {sortBy.map((option: TSort) => (
                            <li key={option.value}>
                                <Link
                                    to={`${selectedCategory}?sort=${option.value}`}
                                >
                                    {option.text}
                                </Link>
                            </li>
                        ))}
                    </SortOptions>
                </DropPanel>
            </FilterBar>
            <ProductsList products={productsList} />
        </main>
    );
};

export default Shopping;
