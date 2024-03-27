import { useEffect, useState } from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { getUserLocation } from "../utils/location";
import { getCities, getClosestCity } from "../utils/api";
import { useCache } from "../contexts/Cache";
import { Props } from "./types";
import { CityRegions } from "../types";
import { LinearGradient } from "expo-linear-gradient";

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
    <View className="flex-1 flex justify-end">
      <Image
        className="w-full h-full absolute"
        source={require("../assets/WelcomePageImage3.jpg")}
      />
      <LinearGradient
        colors={["transparent", "rgba(21, 21, 21, 0.95)"]}
        style={{ width: 700, height: 700 }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute bottom-0"
      />
      <View className="p-10 pb inset-x-0 bottom-20">
        <Text className="text-center text-4xl font-bold text-white space-y-8">
          Welcome to Coffee Connoisseur
        </Text>
        <View className="space-y-3 p-2"></View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ShopSearch");
          }}
          className="bg-white opacity-90 mx-auto p-4 px-10 rounded-full"
        >
          <Text className="font-bold text-xl text-slate-900">
            Discover Coffee
          </Text>
        </TouchableOpacity>
        <StatusBar backgroundColor={"rgba(21, 21, 21, 0.95)"} />
      </View>
    </View>
  );
}
