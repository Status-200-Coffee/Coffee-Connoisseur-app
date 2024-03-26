import { Image, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

import { ShopMapProps } from "../types";

export default function ShopMap(props: ShopMapProps) {
    const { region, setRegion, coffeeShops, userLocation, onPress } = props;

    return (
        <MapView
            className="w-full h-full"
            initialRegion={region}
            region={region}
            onRegionChangeComplete={(region) => {
                setRegion({
                    ...region,
                    // prevents bug where map zooms out when changing
                    // between ShopSearch and FullscreenMap screens
                    latitudeDelta: region.latitudeDelta / 4,
                });
            }}
            onPress={onPress}
        >
            {coffeeShops.map((coffeeShop, index) => {
                const { latitude, longitude, name, rating } = coffeeShop;

                return (
                    <Marker key={index} coordinate={{ latitude, longitude }}>
                        <Image
                            className="h-12 w-12"
                            source={require("../assets/coffee-shop-icon-small.png")}
                        ></Image>

                        <Callout className="w-44">
                            <Text className="text-center">{name}</Text>
                            <Text className="text-center">Rating {rating}</Text>
                        </Callout>
                    </Marker>
                );
            })}

            {userLocation && <Marker coordinate={userLocation}></Marker>}
        </MapView>
    );
}
