import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import {
    MaterialIcons,
    FontAwesome6,
    AntDesign,
    Entypo,
    Fontisto,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { useCache } from "../contexts/Cache";

import { Props } from "./types";
import { CoffeeShop } from "../types";
import axios from "axios";

export default function ShopPage({ navigation, route }: Props<"ShopPage">) {
    const [favouriteShop, setFavouriteShop] = useState<Array<number>>([]);
    const [favouriteSuccesful, setFavouriteSuccessful] =
        useState<boolean>(false);
    const [favouriteError, setFavouriteError] = useState<boolean>(false);
    const [removeFavourite, setRemoveFavourite] = useState<boolean>(false);

    const { shop_id } = route.params;
    const { cache, setCache } = useCache();

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

    function handleFavourite() {
        axios
            .patch(
                `https://coffee-connoisseur-api.onrender.com/api/users/${cache.user?.username}`,
                { addToFavourites: shopPage._id }
            )
            .then(({ data: { user } }) => {
                setFavouriteShop(user.favouriteShops);
                setFavouriteSuccessful(true);
                setTimeout(() => {
                    setFavouriteSuccessful(true);
                }, 3000);
            })
            .catch((err) => {
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
                { removeFromFavourites: shopPage._id }
            )
            .then(({ data: { user } }) => {
                setRemoveFavourite(user.favouriteShops);
                setFavouriteSuccessful(false);
                setTimeout(() => {
                    setFavouriteSuccessful(false);
                }, 3000);
            })
            .catch((err) => {
                setFavouriteError(true);
            });
    }

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

    if (favouriteError) {
        return (
            <View className="flex-1 bg-cyan-50 justify-center items-center m-2 border-slate-700 border-2 rounded">
                <View className="m-5 items-center justify-center">
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
                        <Text className="m-3 p-2 pr-12 pl-12 bg-blue-900 rounded-full text-center font-bold text-white text-base">
                            Login
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("SignUpPage");
                        }}
                    >
                        <Text className="m-3 p-2 pr-12 pl-12 bg-blue-900 rounded-full text-center font-bold text-white text-base">
                            Sign up
                        </Text>
                    </Pressable>
                </Animatable.View>
            </View>
        );
    }

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
                    {(() => {
                        if (!favouriteSuccesful) {
                            return (
                                <Pressable
                                    key={shop_id}
                                    onPress={handleFavourite}
                                >
                                    <AntDesign
                                        name="heart"
                                        size={30}
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
