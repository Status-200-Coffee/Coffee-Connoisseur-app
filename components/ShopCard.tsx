import { Image, Text, View, Pressable } from "react-native";
import {
    MaterialIcons,
    FontAwesome6,
    AntDesign,
    Entypo,
    Fontisto,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { ShopCardProps } from "./types";
import { useState } from "react";
import { useCache } from "../contexts/Cache";

import axios from "axios";

export default function ShopCard({ shop, navigation }: ShopCardProps) {
    const [favouriteShop, setFavouriteShop] = useState<Array<number>>([]);
    const [favouriteSuccesful, setFavouriteSuccessful] =
        useState<boolean>(false);
    const [favouriteError, setFavouriteError] = useState<boolean>(false);
    const [removeFavourite, setRemoveFavourite] = useState<boolean>(false);

    const { cache, setCache } = useCache();

    function handleFavourite() {
        axios
            .patch(
                `https://coffee-connoisseur-api.onrender.com/api/users/${cache.user?.username}`,
                { addToFavourites: shop._id }
            )
            .then(({ data: { user } }) => {
                setFavouriteShop(user.favouriteShops);
                console.log("favourited");
                setFavouriteSuccessful(true);
                setTimeout(() => {
                    setFavouriteSuccessful(true);
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
                setFavouriteError(true);
                setTimeout(() => {
                    setFavouriteError(false);
                }, 9000);
            });
    }

    function handleRemoveFavourite() {
        axios
            .patch(
                `https://coffee-connoisseur-api.onrender.com/api/users/${cache.user?.username}`,
                { removeFromFavourites: shop._id }
            )
            .then(({ data: { user } }) => {
                setRemoveFavourite(user.favouriteShops);
                setFavouriteSuccessful(false);
                setTimeout(() => {
                    setFavouriteSuccessful(false);
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
                setFavouriteError(true);
            });
    }

    if (favouriteError) {
        return (
            <View className="m-3 flex-1 pb-5justify-center border-slate-700 bg-sky-100 border-2 rounded items-center">
                <View className="m-3 items-center justify-center">
                    <Text className="m-2 font-bold text-xl text-center">
                        Login or create an account to add this shop to your
                        favourites
                    </Text>
                    <Fontisto name="coffeescript" size={24} color="#FF3368" />
                </View>
                <Animatable.View animation="zoomIn" duration={4000}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("LoginPage");
                        }}
                    >
                        <Text className="m-2 p-2 pr-12 pl-12 bg-blue-900 rounded-full text-center font-bold text-white text-base">
                            Login
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("SignUpPage");
                        }}
                    >
                        <Text className="m-2 p-2 pr-12 pl-12 bg-blue-900 rounded-full text-center font-bold text-white text-base">
                            Sign up
                        </Text>
                    </Pressable>
                </Animatable.View>
            </View>
        );
    }

    return (
        <View className="flex-row border-2 border-slate-700 rounded m-2 items-center bg-sky-100">
            <Image
                source={{ uri: shop.mainImage }}
                style={{ width: 150, height: 150, margin: 10 }}
            />
            <View className="flex-1 items-center">
                <Text className="font-bold leading-8 text-base">
                    {shop.name}
                </Text>
                <View className="flex-row items-center">
                    <Entypo name="location-pin" size={20} color="black" />
                    <Text className="text-base">{shop.city}</Text>
                    <Text className="text-base mr-2">
                        {" "}
                        {`${shop.distance} km`}
                    </Text>
                </View>
                <Text className="font-bold leading-6 text-base">
                    {shop.rating} / 5
                </Text>
                <View className="flex-row m-0.5">
                    {(() => {
                        if (shop.dogFriendly) {
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
                        if (shop.hasSeating) {
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
                        if (shop.dairyFree) {
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
                <View className="flex flex-row items-center mr-2">
                    <Pressable
                        key={shop._id}
                        onPress={() =>
                            navigation.navigate("ShopPage", {
                                shop_id: shop._id,
                            })
                        }
                    >
                        <Text className="m-2 p-2 pr-6 pl-6 bg-blue-900 text-center font-bold text-white rounded-full">
                            View Shop
                        </Text>
                    </Pressable>
                    {(() => {
                        if (!favouriteSuccesful) {
                            return (
                                <Pressable onPress={handleFavourite}>
                                    <AntDesign
                                        name="heart"
                                        size={28}
                                        color="#FF3368"
                                    />
                                </Pressable>
                            );
                        }
                        if (favouriteSuccesful) {
                            return (
                                <Animatable.View
                                    animation="shake"
                                    duration={3000}
                                >
                                    <Pressable onPress={handleRemoveFavourite}>
                                        <AntDesign
                                            name="heart"
                                            size={28}
                                            color="purple"
                                        />
                                    </Pressable>
                                </Animatable.View>
                            );
                        }
                    })()}
                </View>
            </View>
        </View>
    );
}
