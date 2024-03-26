import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { getUserLocation } from "../utils/location";
import { getCities, getClosestCity } from "../utils/api";
import { useCache } from "../contexts/Cache";

import { Props } from "./types";
import { CityRegions } from "../types";

export default function LoadingScreen({ navigation }: Props<"LoadingScreen">) {
    const { cache, setCache } = useCache();
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        getUserLocation()
            .then((result) => {
                if (!result) {
                    return "Carlisle";
                }

                const { latitude, longitude } = result;

                setCache((cache) => {
                    return { ...cache, userLocation: { latitude, longitude } };
                });

                return getClosestCity({ latitude, longitude });
            })
            .then((city) => {
                setCache((cache) => {
                    return { ...cache, currentCity: city };
                });

                return getCities();
            })
            .then((cities) => {
                const newObj: CityRegions = {};

                cities.map((city) => {
                    newObj[city.city] = {
                        latitude: city.latitude,
                        longitude: city.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    };
                });

                setCache((cache) => {
                    return { ...cache, cities: newObj };
                });
            })
            .then(() => {
                setCache((cache) => {
                    return { ...cache, cityShops: {} };
                });
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                if (retry > 5) {
                    throw new Error("Too many retries");
                }

                console.log(retry);

                gotEverything();
            });
    }, [retry]);

    function gotEverything() {
        if (
            cache.userLocation &&
            cache.cities &&
            cache.currentCity &&
            cache.cityShops
        ) {
            navigation.navigate("ShopSearch");
        } else {
            setRetry((retry) => retry + 1);
        }
    }

    return (
        <View className="flex justify-center">
            <ActivityIndicator size="large"></ActivityIndicator>
            <Text className="text-center">App is initialising</Text>
        </View>
    );
}
