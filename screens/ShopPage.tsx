import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { useCache } from "../contexts/Cache";

import { Props } from "./types";
import { CoffeeShop } from "../types";

export default function ShopPage({ navigation, route }: Props<"ShopPage">) {
    const { shop_id } = route.params;
    const { cache } = useCache();

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

        for (let shop of shops) {
            if (shop._id === shop_id) {
                setShopPage(shop);
                setIsLoading(false);
                return;
            }
        }
    }, []);

    if (isLoading) {
        return <Text className="">Loading...</Text>;
    }

    return (
        <ScrollView>
            <View className="flex-1 items-center bg-cyan-50 p-5">
                <Image
                    className="width-300 height-300 margin-10"
                    source={{ uri: shopPage.mainImage }}
                    style={{ width: 300, height: 300, margin: 12 }}
                />
                <Text className="font-bold leading-8 text-2xl">
                    {shopPage.name}
                </Text>
                <Text className="leading-10 text-lg italic">
                    {shopPage.description}
                </Text>
                <Text className="text-lg">
                    Location: {shopPage.distance} {shopPage.city}
                </Text>
                <Text className="font-bold leading-10 text-lg">
                    {shopPage.rating} / 5
                </Text>
                <View className="flex-row justify-evenly">
                    {(() => {
                        if (shopPage.hasSeating) {
                            return <Text className="text-xl m-1">🪑</Text>;
                        }
                    })()}
                    {(() => {
                        if (shopPage.dogFriendly) {
                            return <Text className="text-xl m-1">🐶</Text>;
                        }
                    })()}
                    {(() => {
                        if (shopPage.dairyFree) {
                            return <Text className="text-xl m-1">🌿</Text>;
                        }
                    })()}
                </View>
                <Text className="font-bold text-lg">
                    {" "}
                    Connoisseur's Favourite Coffee{" "}
                </Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className=""
                >
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
                    <Text className="m-2 p-2 bg-blue-900 text-center font-bold text-white rounded mb-5 text-base">
                        Take a picture
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
