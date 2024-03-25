import { Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { ShopMapProps } from "../types";

export default function ShopMap(props: ShopMapProps) {
    const { region, setRegion, coffeeShops, onPress } = props;

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
