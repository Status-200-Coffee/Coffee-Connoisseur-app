import MapView from "react-native-maps";

export default function ShopMap() {
    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
    };

    return <MapView className="h-full w-full" initialRegion={initialRegion}></MapView>
}
