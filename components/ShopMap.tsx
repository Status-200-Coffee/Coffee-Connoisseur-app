import { Image, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styled } from "nativewind";

const StyledMapView = styled(MapView);

interface ShopMapProps {
    initialRegion: Region;
    coffeeShops: Coordinates[];
    mapDimensions: string[];
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
    const initialRegion = props.initialRegion;
    const coffeeShops = props.coffeeShops;
    const [width, height] = props.mapDimensions;

    return (
        <MapView
            className={`flex w-${width} h-${height}`}
            initialRegion={initialRegion}
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
