
// Image:
import React from "react";

import Banner from "~/components/banner/Banner";

const SHOP_IMG = {
    source: '/assets/images/shop.png',
    alt: 'shopping'
}

export default function Index() {
    return (
        <main>
            <Banner source={SHOP_IMG.source} alt={SHOP_IMG.alt} />
        </main>
    );
}
