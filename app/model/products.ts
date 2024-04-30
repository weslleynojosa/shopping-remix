import {db} from "~/db.server";

import type {Gender, TProduct, TSort} from "~/types/model.type";

const orderedProducts = (products: TProduct[] = [], sort?: string | null) => {
    if (sort === 'asc') {
        products.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
        products.sort((a, b) => b.price - a.price);
    }

    return products;
}

export const getProducts = (sort?: string | null): TProduct[] => {
    try {
        const products: TProduct[] = db.data.products;

        if (!products.length) {
            return [];
        }

        return orderedProducts(products, sort);
    } catch (error) {
        throw error;
    }
}

export const getProduct = (id: string): TProduct | undefined => {
    try {
        return db.data.products.find((item) => item.id === id);
    } catch (error) {
        throw error;
    }
}

export const getCategories = (): string[] => {
    try {
        return db.data.categories;
    } catch (error) {
        throw error;
    }
}

export const getSortOptions = (): TSort[] => ([{
    value: 'asc',
    text: 'Price (Low to High)'
}, {
    value: 'desc',
    text: 'Price (High to Low)'
}])

export const getProductsByParams = (query: { gender?: Gender, category?: string }, sort?: string | null): TProduct[] => {
    try {
        const products: TProduct[] = db.data.products.filter((item) =>
            (!query?.gender || query.gender === item.gender) && (!query.category || query.category === item.category));

        return orderedProducts(products, sort);
    } catch (error) {
        throw error;
    }
}
