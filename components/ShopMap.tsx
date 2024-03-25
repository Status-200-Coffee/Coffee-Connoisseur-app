import { Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface ShopMapProps {
    region: Region;
    setRegion: any;
    coffeeShops: Coordinates[];
    onPress?: (name: any) => void;
}

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface Coordinates {
    latitude: number;
    longitude: number;
}

export default function ShopMap(props: ShopMapProps) {
    const region = props.region;
    const setRegion = props.setRegion;
    const coffeeShops = props.coffeeShops;
    const onPress = props.onPress;

    return (
        <MapView
            className="w-full h-full"
            initialRegion={region}
            region={region}
            onRegionChangeComplete={(region) => {
                setRegion({
                    ...region,
                    latitudeDelta: region.latitudeDelta / 4,
                });
            }}
            onPress={onPress}
        >
            {coffeeShops.map((coords, index) => {
                return (
                    <Marker key={index} coordinate={coords}>
                        <Image
                            className="h-12 w-12"
                            source={require("../assets/coffee-shop-icon-small.png")}
                        ></Image>
                    </Marker>
                );
            })}
        </MapView>
    );
}
