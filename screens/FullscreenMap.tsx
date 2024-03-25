import ShopMap from "../components/ShopMap";

import { Props } from "./types";

export default function FullscreenMap({ route }: Props<"FullscreenMap">) {
    const { coffeeShops, region, setRegion } = route.params;

    return (
        <ShopMap
            region={region}
            setRegion={setRegion}
            coffeeShops={coffeeShops}
        ></ShopMap>
    );
}
