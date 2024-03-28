import React from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Props } from "./types";
import ShopList from "../components/ShopList";
import { useCache } from "../contexts/Cache";
import { getShopsByCity } from "../utils/api";

import { CoffeeShop, Region, User } from "../types";
import ShopCard from "../components/ShopCard";

export default function ProfilePage({
    navigation,
    route,
}: Props<"ProfilePage">) {
    const { cache, setCache } = useCache();
    const [loaded, setLoaded] = useState<boolean>(false);
    const currShops = [];

    const [shopList, setShopList] = useState<CoffeeShop[]>([]);
    const [filteredShopList, setFilteredShopList] = useState<CoffeeShop[]>([]);

    const username = "easter";
    // const { username } = route.params;
    // const [isLoading, setIsLoading] = useState(true);
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
        axios
            .get(
                `https://coffee-connoisseur-api.onrender.com/api/users/${username}`
            )
            .then(({ data: { user } }) => {
                setUserPage(user);
                // setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setLoaded(false);

        const currentCity = cache.currentCity || "Carlisle";

        getShopsByCity(currentCity, "", "").then((shop) => {
            setShopList(shop);
        });
    }, []);

    // isLoading ?
    // (
    //     <Text className="">Loading...</Text>
    // ) :
    return (
        <View className="flex justify-items-center py-4">
            <Text className="font-bold text-lg">Profile</Text>
            <Text>Username: {userPage.username}</Text>
            <Text className="font-bold text-lg"> Favourite Coffees</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className=""
            >
                {userPage.photosPosted.map((image) => {
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
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className=""
            >
                {userPage.favouriteShops.map((coffeeShopID) => {
                    return (
                        <View key={coffeeShopID} className="pt-2">
                            <Text className="font-bold text-lg">
                                {" "}
                                {coffeeShopID}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
            <ScrollView>
                {shopList.map((shop) => {
                    return (
                        <View key={shop._id}>
                            <ShopCard shop={shop} navigation={navigation} />
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}
