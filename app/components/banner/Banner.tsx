import { Link } from "@remix-run/react";

const Banner = ({ source, alt }: { source: string; alt: string }) => {
    return (
        <Link to={"shopping"}>
            <img src={source} alt={alt} />
        </Link>
    );
};

export default Banner;
