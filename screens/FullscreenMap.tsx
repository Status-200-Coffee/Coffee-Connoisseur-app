import ShopMap from "../components/ShopMap";

interface FullscreenMapProps {
    navigation: { navigate: (name: string) => void };
    // route: { params: { initialRegion: any; coffeeShops: any } };
    route: any;
}

export default function FullscreenMap(props: FullscreenMapProps) {
    const route = props.route;

    const { initialRegion, coffeeShops } = route.params;

    return (
        <ShopMap
            initialRegion={initialRegion}
            coffeeShops={coffeeShops}
        ></ShopMap>
    );
}
