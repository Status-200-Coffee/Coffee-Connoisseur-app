import { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, Button, Pressable } from "react-native";

import CoffeeRewards from "../components/CoffeeReward";
import ShopCard from "../components/ShopCard";
import { useCache } from "../contexts/Cache";
import { getShopsByCity, getUser } from "../utils/api";

import { Props } from "./types";
import { CoffeeShop, User } from "../types";

export default function ProfilePage({ navigation }: Props<"ProfilePage">) {
    const { cache, setCache } = useCache();
    const [shopList, setShopList] = useState<CoffeeShop[]>([]);
    const username = cache.user?.username;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userPage, setUserPage] = useState<User>({
        _id: 0,
        profilePicture: "",
        username: "",
        password: "",
        email: "",
        coffeeCollected: 0,
        photosPosted: [],
        favouriteShops: [],
    });

    useEffect(() => {
        if (shopList.length > 0) {
            setShopList([]);
        }
        getUser(username!)
            .then((user) => {
                setUserPage(user);
                const favShops = user.favouriteShops;
                const cities = Object.keys(favShops);
                cities.forEach((city) => {
                    getShopsByCity(city, "", "").then((shops) => {
                        const filteredShops = shops.filter((shop) => {
                            return favShops[city].includes(shop._id);
                        });
                        setShopList((currShops) => {
                            return [...currShops, ...filteredShops];
                        });
                        setIsLoading(false);
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleLogout() {
        setCache((currentCache) => {
            return { ...currentCache, user: null };
        });
        navigation.navigate("ShopSearch");
    }

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView className="flex-1 bg-white" key="profile">
            <Text className="text-center font-bold text-xl p-2">
                Hey, {userPage.username}!
            </Text>
            <View className="justify-center bg-blue-900 rounded-full mx-20 my-2 p-2">
                <Pressable onPress={handleLogout}>
                    <Text className="text-center text-white font-bold">
                        Logout
                    </Text>
                </Pressable>
            </View>
            <CoffeeRewards />
            <Text className="text-lg font-bold pl-5">Your coffee pics:</Text>
            <ScrollView
                key="profile-photos"
                horizontal
                showsHorizontalScrollIndicator={false}
                className="pl-3"
            >
                {userPage.photosPosted.map((image, index) => {
                    return (
                        <View key={index} className="pt-2">
                            <Image
                                source={{ uri: image }}
                                style={{
                                    borderRadius: 20,
                                    width: 180,
                                    height: 180,
                                    margin: 6,
                                }}
                            />
                        </View>
                    );
                })}
            </ScrollView>
            <Text className="font-bold text-lg pl-5 pt-3">
                Your favourites:
            </Text>
            {shopList.map((shop) => {
                return (
                    <View key={`${shop._id}${shop.city}`}>
                        <ShopCard shop={shop} navigation={navigation} />
                    </View>
                );
            })}
        </ScrollView>
    );
}
