import ShopMap from "../components/ShopMap";
import { useCache } from "../contexts/Cache";
import { RegionProvider } from "../contexts/Region";
import { Props } from "./types";

export default function FullscreenMap({ navigation }: Props<"FullscreenMap">) {
    const { cache } = useCache();

    return (
        <RegionProvider>
            <ShopMap
                navigation={navigation}
                initialRegion={cache.cities[cache.currentCity!]}
            ></ShopMap>
        </RegionProvider>
    );
}
