import ShopMap from "../components/ShopMap";

interface FullscreenMapProps {
    navigation: { navigate: (name: string) => void };
    // route: { params: { initialRegion: any; coffeeShops: any } };
    route: any;
}

export default function FullscreenMap(props: FullscreenMapProps) {
    const route = props.route;

    const { coffeeShops, region, setRegion } = route.params;

    return (
        <ShopMap
            region={region}
            setRegion={setRegion}
            coffeeShops={coffeeShops}
        ></ShopMap>
    );
}
