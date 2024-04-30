import { useEffect, useRef } from "react";

import { Form, useActionData, useTransition } from "@remix-run/react";
import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { addToBag } from "~/model/bag";

import Select from "~/components/select/Select";
import Button from "~/components/button/Button";

import type { ProductDetailProps } from "~/routes/product/ProductDetails.types";

import {
    Main,
    ImageWrapper,
    ProductInformation,
    Category,
    Price,
    Description,
    Image,
} from "./ProductDetails.styles";

const QUANTITY: number[] = [...Array(5).keys()].map((i) => i + 1);

export const action: ActionFunction = async ({
    request,
    params,
}: ActionArgs) => {
    const productId = params.id;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    if (!productId) {
        return json({
            error: "productId is missing",
        });
    }

    if (!data?.quantity) {
        return json({
            error: "You need to select one option",
        });
    }

    await addToBag(productId, Number(data.quantity));

    return json({
        success: true,
    });
};
const ProductDetails = ({ product }: ProductDetailProps) => {
    const htmlString = { __html: product.description };
    const transition = useTransition();
    const actionData = useActionData<typeof action>();
    const handleSubmit = transition.state === "submitting";
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!handleSubmit) {
            formRef.current?.reset();
        }
    }, [handleSubmit]);

    return (
        <Main>
            <ImageWrapper>
                <Image src={product.image} alt={product.title} />
            </ImageWrapper>
            <ProductInformation>
                <Category>{product.category}</Category>
                <h1>{product.title}</h1>
                <Price>{product.price} €</Price>
                <Description dangerouslySetInnerHTML={htmlString} />
                <Form method="post" ref={formRef}>
                    <Select
                        id="quantity"
                        name="quantity"
                        defaultValue="0"
                        required
                        error={actionData?.error}
                    >
                        <option disabled value="0" id="0">
                            {"Select quantity"}
                        </option>
                        {QUANTITY.map((qty) => {
                            return (
                                <option key={qty} value={qty} id={`${qty}`}>
                                    {qty}
                                </option>
                            );
                        })}
                    </Select>
                    <Button
                        primary
                        type="submit"
                        loading={handleSubmit}
                        disabled={handleSubmit}
                        fullWidth
                    >
                        {"Add to Bag"}
                    </Button>
                </Form>
            </ProductInformation>
        </Main>
    );
};

export default ProductDetails;
