import React from "react";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
    Counter,
    Logo,
    Nav,
    StyledBagLink,
    StyledHeader,
    StyledLink,
} from "./Header.styles";

import Account from "~/components/icons/Account";
import Bag from "~/components/icons/Bag";

import { getBagCount } from "~/model/bag";

export const loader: LoaderFunction = async () => {
    return json({ bagItems: await getBagCount() });
};
const Header: React.FC = () => {
    const { bagItems } = useLoaderData<typeof loader>();

    const bagCounter = () => {
        if (bagItems === 0) {
            return null;
        }

        return bagItems >= 100 ? "+99" : bagItems;
    };
    return (
        <StyledHeader>
            <Nav>
                <Logo to="/">{"Switch Store"}</Logo>
                <StyledLink to="/shopping">{"Shopping"}</StyledLink>
            </Nav>

            <StyledLink to="/account/profile">
                <Account />
            </StyledLink>
            <StyledBagLink to="/bag">
                <Bag />
                <Counter>{bagCounter()}</Counter>
            </StyledBagLink>
        </StyledHeader>
    );
};

export default Header;
