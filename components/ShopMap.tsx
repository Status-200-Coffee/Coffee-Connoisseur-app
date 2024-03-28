import { useEffect } from "react";
import { Image, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

import { useCache } from "../contexts/Cache";
import { useRegion } from "../contexts/Region";

import { Region } from "../types";
import { ShopMapProps } from "./types";

export default function ShopMap({
    navigation,
    initialRegion,
    onPress,
}: ShopMapProps) {
    const { cache } = useCache();
    const { region, setRegion } = useRegion();

    useEffect(() => {
        setRegion(initialRegion);
    }, [initialRegion]);

    function navigateToShopPage(shop_id: number) {
        navigation.navigate("ShopPage", { shop_id });
    }

    function renderCoffeeShops() {
        const coffeeShops = cache.cityShops[cache.currentCity!];

        if (!coffeeShops) {
            return;
        }

        return coffeeShops.map((coffeeShop, index) => {
            const { latitude, longitude, name, rating } = coffeeShop;

            return (
                <Marker key={index} coordinate={{ latitude, longitude }}>
                    <Image
                        className="h-12 w-12"
                        source={require("../assets/coffee-shop-icon-small.png")}
                    ></Image>

                    <Callout
                        className="w-44"
                        onPress={() => {
                            navigateToShopPage(coffeeShop._id);
                        }}
                    >
                        <Text className="text-center">{name}</Text>
                        <Text className="text-center">Rating {rating}</Text>
                    </Callout>
                </Marker>
            );
        });
    }

    function updateRegion(newRegion: Region) {
        setRegion(newRegion);
    }

    return (
        <MapView
            className="w-full h-full"
            initialRegion={initialRegion}
            region={region}
            onRegionChangeComplete={updateRegion}
            onPress={onPress}
        >
            {renderCoffeeShops()}

            {cache.userLocation && (
                <Marker coordinate={cache.userLocation}></Marker>
            )}
        </MapView>
    );
}
