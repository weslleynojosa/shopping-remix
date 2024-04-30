import React from "react";
import {Links, LiveReload, Meta, Scripts, ScrollRestoration} from "@remix-run/react";
import {Global} from "@emotion/react";
import globalStyles from "~/theme/global.styles";

type DocumentProps = {
    children: React.ReactNode;
    title?: string;
};

const Document: React.FC<DocumentProps> = ({ children, title }) => (
    <html lang="en">
    <head>
        {title ? <title>{title}</title> : undefined}
        {/* All meta exports on all routes will go here */}
        <Meta/>
        {/* All link exports on all routes will go here */}
        <Links/>
    </head>
    <body>
    {/* Global emotion styles */}
    <Global styles={globalStyles}/>

    {children}

    {/* Manages scroll position for client-side transitions */}
    {/* If you use a nonce-based content security policy for scripts,
    you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
    <ScrollRestoration/>

    {/* Script tags go here */}
    {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop.
    Otherwise, omit the nonce prop as shown here. */}
    <Scripts/>

    {/* Sets up automatic reload when you change code */}
    {/* and only does anything during development */}
    {/* If you use a nonce-based content security policy for scripts,
    you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
    <LiveReload/>
    </body>
    </html>
);

export default Document;
