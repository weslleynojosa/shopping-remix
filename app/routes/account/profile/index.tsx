import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

import { getProfile } from "~/model/user";
import type { TProfile } from "~/model/user";

import Input from "~/components/input/Input";

import { H1, ProfileForm, Section } from "./Profile.styles";

export const loader: LoaderFunction = async () => {
    const user = await getProfile();

    return json<TProfile>(user);
};

const Profile = () => {
    const data = useLoaderData<TProfile>();

    return (
        <>
            <H1>My profile</H1>
            <Section>
                <ProfileForm>
                    <Input
                        type="name"
                        label={"Name"}
                        disabled
                        value={data.name}
                    />
                    <Input
                        type="email"
                        label={"Email"}
                        disabled
                        value={data.email}
                    />
                    <Input
                        type="phone"
                        label={"Phone Number"}
                        value={data.phoneNumber || "--"}
                        disabled
                    />
                    <Link to="edit">Edit</Link>
                </ProfileForm>
            </Section>
        </>
    );
};

export default Profile;
