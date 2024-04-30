import React from "react";
import { Outlet, useCatch } from "@remix-run/react";

// Components
import Header, { loader } from "~/components/header/Header";
import Footer from "~/components/footer/Footer";
import Document from "~/components/document/Document";

import type { ErrorBoundaryComponent, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Switch Store",
    viewport: "width=device-width,initial-scale=1",
});

export { loader };

export default function App() {
    return (
        <Document>
            <Header />
            {/* Child routes go here */}
            <Outlet />
            <Footer />
        </Document>
    );
}

export const CatchBoundary = () => {
    const caught = useCatch();

    return (
        <Document title="Oops!">
            <main
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {caught.status === 404 && (
                    <img
                        alt="Not found"
                        style={{ maxHeight: "100vh", width: "auto" }}
                        src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/ad42057889c385dd8f84b8330f69269b.gif"
                    />
                )}
                {caught.status !== 404 && <h1>Oops! Something went wrong!</h1>}
            </main>
        </Document>
    );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return (
        <Document title="Oops!">
            <main>
                <h1>Oops! Something went wrong!</h1>
                <pre>{error.stack}</pre>
            </main>
        </Document>
    );
};
