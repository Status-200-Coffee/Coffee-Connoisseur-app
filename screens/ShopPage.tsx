import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { MaterialIcons, FontAwesome6, Entypo } from "@expo/vector-icons";

import FavouriteButton from "../components/FavouriteButton";
import { useCache } from "../contexts/Cache";

import { Props } from "./types";
import { CoffeeShop } from "../types";

export default function ShopPage({ navigation, route }: Props<"ShopPage">) {
    const { cache } = useCache();
    const { shop_id } = route.params;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [shopPage, setShopPage] = useState<CoffeeShop>({
        _id: 0,
        name: "",
        mainImage: "",
        userImages: [],
        description: "",
        longitude: 0,
        latitude: 0,
        city: "",
        distance: "",
        totalRatings: 0,
        rating: 0,
        dogFriendly: false,
        hasSeating: false,
        dairyFree: false,
    });

    useEffect(() => {
        const shops = cache.cityShops[cache.currentCity!];

        for (const shop of shops) {
            if (shop._id === shop_id) {
                setShopPage(shop);
                setIsLoading(false);
                return;
            }
        }
    }, []);

    return isLoading ? (
        <View className="flex justify-center">
            <ActivityIndicator size="large"></ActivityIndicator>
            <Text className="text-center">App is initialising</Text>
        </View>
    ) : (
        <ScrollView>
            <View className="flex-1 items-center bg-cyan-50 p-5">
                <Image
                    className="width-300 height-300 margin-10"
                    source={{ uri: shopPage.mainImage }}
                    style={{ width: 300, height: 300, margin: 12 }}
                />
                <View className="flex-row items-center">
                    <Text className="font-bold p-1 text-3xl mr-1">
                        {shopPage.name}
                    </Text>

                    <FavouriteButton shopId={shopPage._id}></FavouriteButton>
                </View>
                <Text className="font-bold leading-10 text-xl">
                    Connoisseur Rating: {shopPage.rating} / 5
                </Text>
                <View className="flex-row items-center">
                    <Entypo name="location-pin" size={22} color="black" />
                    <Text className="text-xl">
                        {shopPage.city} {shopPage.distance}
                    </Text>
                    <View className="flex-row m-2 pl-2">
                        {(() => {
                            if (shopPage.dogFriendly) {
                                return (
                                    <FontAwesome6
                                        name="dog"
                                        size={21}
                                        color="brown"
                                    />
                                );
                            }
                        })()}
                        {(() => {
                            if (shopPage.hasSeating) {
                                return (
                                    <MaterialIcons
                                        name="chair"
                                        size={22}
                                        color="darkblue"
                                    />
                                );
                            }
                        })()}
                        {(() => {
                            if (shopPage.dairyFree) {
                                return (
                                    <Entypo
                                        name="leaf"
                                        size={22}
                                        color="green"
                                        title="dairy-free"
                                    />
                                );
                            }
                        })()}
                    </View>
                </View>
                <Text className="pb-4 text-lg italic text-center">
                    {shopPage.description}
                </Text>
                <Text className="font-bold text-xl">
                    {" "}
                    Connoisseur's Favourite Coffee{" "}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {shopPage.userImages.map((image) => {
                        return (
                            <View key={image} className="pt-2">
                                <Image
                                    source={{ uri: image }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        margin: 10,
                                    }}
                                />
                            </View>
                        );
                    })}
                </ScrollView>
                <Pressable
                    key={shopPage._id}
                    onPress={() =>
                        navigation.navigate("CoffeeCamera", {
                            shop_id: shopPage._id,
                        })
                    }
                >
                    <Text className="m-3 p-2 pr-6 pl-6 bg-blue-900 text-center font-bold text-white rounded-full mb-5 text-base">
                        Take a picture
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
