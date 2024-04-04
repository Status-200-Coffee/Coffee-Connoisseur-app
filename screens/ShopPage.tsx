import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { Entypo, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";

import FavouriteButton from "../components/FavouriteButton";
import ShopRating from "../components/ShopRating";
import { useCache } from "../contexts/Cache";

import { Props } from "./types";
import { CoffeeShop } from "../types";

export default function ShopPage({ navigation, route }: Props<"ShopPage">) {
    const { cache } = useCache();
    const { shop_id } = route.params;

    const [rating, setRating] = useState<number>(0);
    const [votes, setVotes] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [shopPage, setShopPage] = useState<CoffeeShop>({
        _id: 0,
        name: "",
        mainImage: {
            altText: "",
            image: "",
        },
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
        userVote: 0,
    });

    useEffect(() => {
        console.log("USE EFFECT");

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
                    source={{ uri: shopPage.mainImage.image }}
                    alt={shopPage.mainImage.altText}
                    style={{ width: 300, height: 300, margin: 12 }}
                />
                <View className="flex-row items-center">
                    <Text className="font-bold p-1 text-3xl">
                        {shopPage.name}
                    </Text>
                    <FavouriteButton
                        city={shopPage.city}
                        navigation={navigation}
                        shopId={shopPage._id}
                    ></FavouriteButton>
                </View>
                <Text className="font-bold text-xl pb-3">
                    {" "}
                    Connoisseur Rating: {rating} / 5
                </Text>
                <ShopRating
                    shop_id={shop_id}
                    setRating={setRating}
                    setVotes={setVotes}
                    shopPage={shopPage}
                    navigation={navigation}
                />
                <Text className="font-bold">({votes})</Text>

                <View className="flex-row items-center">
                    <Entypo name="location-pin" size={22} color="black" />
                    <Text className="text-xl">
                        {shopPage.city} {shopPage.distance}
                    </Text>
                    <View className="flex-row m-2 pl-1">
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
                <Text className="text-xl font-bold">
                    {shopPage.name}'s best coffees
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {shopPage.userImages.map((image) => {
                        return (
                            <View key={image} className="pt-2">
                                <Image
                                    source={{ uri: image }}
                                    style={{
                                        width: 140,
                                        height: 140,
                                        margin: 6,
                                        borderRadius: 20,
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
                            city: shopPage.city,
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
