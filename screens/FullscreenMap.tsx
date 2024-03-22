import ShopMap from "../components/ShopMap";

export default function FullscreenMap() {
    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
    };

    const coffeeShops = [
        {
            latitude: 37.779,
            longitude: -122.43,
        },
        {
            latitude: 37.789,
            longitude: -122.435,
        },
        {
            latitude: 37.7904,
            longitude: -122.432,
        },
    ];

    return (
        <ShopMap
            initialRegion={initialRegion}
            coffeeShops={coffeeShops}
        ></ShopMap>
    );
}
