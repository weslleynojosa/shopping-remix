import { useActionData, useLoaderData, useTransition } from "@remix-run/react";
import type { ActionArgs, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import type { TProfile } from "~/model/user";
import { updateProfile } from "~/model/user";

import Input from "~/components/input/Input";
import Button from "~/components/button/Button";

import {
    CancelLink,
    H1,
    ProfileForm,
    Section,
} from "~/routes/account/profile/Profile.styles";

import { EMAIL_REGEX, PHONE_REGEX } from "~/utils/regexes";

type ErrorType = {
    errors?: {
        name?: string;
        email?: string;
        phoneNumber?: string;
    };
};

export { loader } from ".";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const updatedData: TProfile = {
        name: data?.name as string,
        email: data?.email as string,
        phoneNumber: data?.phoneNumber as string,
    };

    const errors = {
        name: !data?.name ? "Name is required" : undefined,
        email: !data?.email
            ? "Email is required"
            : !EMAIL_REGEX.test(data.email as string)
            ? "Email has an invalid format"
            : undefined,
        phoneNumber:
            data?.phoneNumber && !PHONE_REGEX.test(data.phoneNumber as string)
                ? "Phone number has an invalid format"
                : undefined,
    };

    const checkErrors = Object.values(errors).some(
        (errorMessage) => errorMessage
    );

    if (checkErrors) return json({ errors });

    await updateProfile(updatedData);
    return redirect("/account/profile");
};

const EditProfile = () => {
    const userInfo = useLoaderData();
    const errors = useActionData<ErrorType>()?.errors;
    const transition = useTransition();
    const handleSubmit = transition.state === "submitting";
    return (
        <>
            <H1>Edit profile</H1>
            <Section>
                <ProfileForm method="post">
                    <Input
                        type="name"
                        id="name"
                        name="name"
                        label={"Name"}
                        defaultValue={userInfo.name}
                        error={errors?.name}
                    />
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        label={"Email"}
                        defaultValue={userInfo.email}
                        error={errors?.email}
                    />
                    <Input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        label={"Phone Number"}
                        defaultValue={userInfo.phoneNumber}
                        error={errors?.phoneNumber}
                    />
                    <CancelLink to="/account/profile">{"Cancel"}</CancelLink>
                    <Button
                        primary
                        loading={handleSubmit}
                        disabled={handleSubmit}
                        type="submit"
                    >
                        Save
                    </Button>
                </ProfileForm>
            </Section>
        </>
    );
};

export default EditProfile;
