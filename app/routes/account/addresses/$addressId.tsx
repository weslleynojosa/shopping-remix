import type { LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {useCatch, useLoaderData} from "@remix-run/react";
import invariant from "tiny-invariant";

import {getAddress} from "~/model/addresses";

import {addressFormAction} from "~/components/address-form/AddressForm";

import type {TAddress} from "~/types/model.type";

import {H1, StyledAddressForm} from "~/routes/account/addresses/Addresses.styles";

type LoaderData = {
    address?: TAddress;
};

export const loader: LoaderFunction = async ({ params }) => {
    const addressId = params.addressId;

    invariant(addressId, 'Address Id is missing!');

    const address = await getAddress(addressId);

    if (!address) {
        throw new Response("Not Found", { status: 404 });
    }

    return json<LoaderData>({ address })
};

export const action = addressFormAction;

const EditAddress = () => {
    const { address } = useLoaderData<LoaderData>();

    return (
        <>
            <H1>Edit Address</H1>
            <StyledAddressForm address={address} />
        </>
    )
};

export const CatchBoundary = () => {
    const caught = useCatch();

    if (caught.status === 404) {
        return (
            <img
                alt="Not found"
                style={{ maxHeight: '100vh', width: 'auto' }}
                src="f" />
        );
    }

    return <h1>Oops! Something went wrong!</h1>;
};

export default EditAddress;
