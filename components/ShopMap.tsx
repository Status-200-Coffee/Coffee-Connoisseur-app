import { Image, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";

interface ShopMapProps {
    initialRegion: Region;
    coffeeShops: Coordinates[];
    width: string;
    height: string;
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
    const width = props.width;
    const height = props.height;

    const [isReady, setIsReady] = useState(false);

    return (
        <View className="w-[200px] h-[200px] bg-slate-200">
            {/* <MapView
                className="w-full h-full"
                initialRegion={initialRegion}
                onMapReady={() => setIsReady(true)}
            >
                {isReady &&
                    coffeeShops.map((coords, index) => {
                        return (
                            <Marker key={index} coordinate={coords}>
                                <Image
                                    className="h-12 w-12"
                                    source={require("../assets/coffee-shop-icon-small.png")}
                                ></Image>
                            </Marker>
                        );
                    })}
            </MapView> */}
        </View>
    );
}
