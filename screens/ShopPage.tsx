import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import { useCache } from "../contexts/Cache";

import { Props } from "./types";
import { CoffeeShop } from "../types";
import ShopRating from "../components/ShopRating";

export default function ShopPage({ navigation, route }: Props<"ShopPage">) {
    const { shop_id } = route.params;
    const { cache } = useCache();
    const [rating, setRating] = useState(0);
    const [votes, setVotes] = useState(0);
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
        userVote: 0
    });

    useEffect(() => {
        const shops = cache.cityShops[cache.currentCity!];

        for (const shop of shops) {
            if (shop._id === shop_id) {
                setShopPage(shop);
                setRating(shop.rating);
                setVotes(shop.totalRatings);
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
                <Text className="font-bold p-1 text-3xl">{shopPage.name}</Text>
                <View className="flex-row items-center">
                    <Text className="font-bold leading-10 text-xl">
                        {" "}
                        Connoisseur Rating: {rating} / 5
                    </Text>
                </View>
                <ShopRating
                    shop_id={shop_id}
                    setRating={setRating}
                    setVotes={setVotes}
                    shopPage={shopPage}
                />
                <Text>({votes})</Text>
                <View className="flex-row items-center">
                    <Entypo name="location-pin" size={22} color="black" />
                    <Text className="text-xl">
                        {shopPage.city} {shopPage.distance}
                    </Text>
                    <View className="flex-row m-2 pl-4">
                        {(() => {
                            if (shopPage.dogFriendly) {
                                return (
                                    <FontAwesome6
                                        name="dog"
                                        size={21}
                                        color="black"
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
                                        color="black"
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
                                        color="black"
                                    />
                                );
                            }
                        })()}
                    </View>
                </View>
                <Text className="pb-5 leading-10 text-lg italic items-center">
                    {shopPage.description}
                </Text>
                <Text className="font-bold text-xl">
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
