
import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Props } from "./types";
import { useCache } from "../contexts/Cache";
import { getShopsByCity } from "../utils/api";
import { CoffeeShop, User } from "../types";
import ShopCard from "../components/ShopCard";
import CoffeeRewards from "../components/CoffeeReward";
export default function ProfilePage({ navigation }: Props<"ProfilePage">) {
    const { cache, setCache } = useCache();
    const [shopList, setShopList] = useState<CoffeeShop[]>([]);
    useCache;
    const username = cache.user?.username;
    const [isLoading, setIsLoading] = useState(true);
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
        console.log(username);
        const currentCity = cache.currentCity || "Carlisle";
        axios
            .get(
                `https://coffee-connoisseur-api.onrender.com/api/users/${username}`
            )
            .then(({ data: { user } }) => {
                setUserPage(user);
                
                const favShops = user.favouriteShops;
                getShopsByCity(currentCity, "", "")
                    .then((shop) => {
                        const filtered = shop.filter(function (item) {
                            return favShops.indexOf(item._id) !== -1;
                        });
                        return filtered;
                    })
                    .then((data) => {
                        setShopList(data);
                        setIsLoading(false);
                    });
            })
            .catch((error) => console.log(error));
    }, [username]);
    return isLoading ? (
        <Text>Loading...</Text>
    ) : (
        <ScrollView className="flex-1" key="profile">
            <Text className="font-bold text-xl">
                Hello, {userPage.username}!
            </Text>
            <ScrollView
                key="profile-photos"
                horizontal
                showsHorizontalScrollIndicator={false}
                className=""
            >
                {userPage.photosPosted.map((image) => {
                    return (
                        <View key={image} className="pt-2 ml-0 h-60">
                            <Image
                                source={{ uri: image }}
                                style={{
                                    width: 180,
                                    height: 180,
                                    margin: 5,
                                }}
                            />
                        </View>
                    );
                })}
            </ScrollView>
            <CoffeeRewards></CoffeeRewards>
            <Text className="font-bold text-lg">Your favourites:</Text>
            {shopList.map((shop) => {
                return (
                    <View key={shop._id}>
                        <ShopCard shop={shop} navigation={navigation} />
                    </View>
                );
            })}
        </ScrollView>
    );
}