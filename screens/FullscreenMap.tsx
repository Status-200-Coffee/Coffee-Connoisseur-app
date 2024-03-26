import ShopMap from "../components/ShopMap";
import { useCache } from "../contexts/Cache";
import { RegionProvider } from "../contexts/Region";

export default function FullscreenMap() {
    const { cache } = useCache();

    return (
        <RegionProvider>
            <ShopMap initialRegion={cache.cities[cache.currentCity!]}></ShopMap>
        </RegionProvider>
    );
}
