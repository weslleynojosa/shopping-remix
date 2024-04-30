import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";

import {
    getBag,
    getBagCount,
    getTotalAmount,
    removeFromBag,
} from "~/model/bag";

import MiniProductItem from "~/components/mini-product-item/MiniProductItem";

import type { TBagItemDetailed } from "~/types/model.type";

import {
    Ul,
    Li,
    Main,
    StyledButton,
    Wrapper,
    Summary,
    ProceedCheckout,
} from "./Bag.styles";

type LoaderData = {
    items: TBagItemDetailed[];
    counter: number;
    totalAmount: number;
};

export const loader: LoaderFunction = async () => {
    const bagItems = await getBag();
    const bagCounter = await getBagCount();
    const totalAmount = await getTotalAmount();

    return json<LoaderData>({
        items: bagItems,
        counter: bagCounter,
        totalAmount,
    });
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    if (data?.id) {
        await removeFromBag(data?.id as string);
    }

    return null;
};

/**
 * TODO: Bag requirements:
 * Implements remove item
 */
const Bag = () => {
    const { items, totalAmount, counter } = useLoaderData<LoaderData>();
    const fetcher = useFetcher();

    const removeItemFromBag = (id: string) => () => {
        fetcher.submit({ id }, { method: "post", action: "bag?index" });
    };

    return (
        <Main>
            <h1>Bag</h1>
            <Wrapper>
                <Ul>
                    {items.length === 0 && (
                        <li>
                            <h2>Your bag is empty</h2>
                            <p>
                                Add to your bag by clicking in the product
                                detail page.
                            </p>
                            <Link to="/shopping">Go to Shopping</Link>
                        </li>
                    )}
                    {items.map((item) => (
                        <Li key={item.id}>
                            <MiniProductItem product={item}>
                                <StyledButton
                                    aria-label="remove"
                                    onClick={removeItemFromBag(item.id)}
                                >
                                    Remove
                                </StyledButton>
                            </MiniProductItem>
                        </Li>
                    ))}
                </Ul>
                {items.length > 0 && (
                    <Summary>
                        <h2>Summary</h2>
                        <p>
                            <strong>Items:</strong> {counter}
                        </p>
                        <p>
                            <strong>Total Amount:</strong> {totalAmount} €
                        </p>
                        <ProceedCheckout to="/checkout">
                            Proceed to Checkout
                        </ProceedCheckout>
                    </Summary>
                )}
            </Wrapper>
        </Main>
    );
};

export default Bag;
