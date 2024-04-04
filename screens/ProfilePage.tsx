import { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, Button } from "react-native";

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
        <ScrollView className="flex-1" key="profile">
            <Button title="Logout" onPress={handleLogout}></Button>
            <Text className="font-bold text-xl">
                Hello, {userPage.username}!
            </Text>

            <ScrollView
                key="profile-photos"
                horizontal
                showsHorizontalScrollIndicator={false}
                className=""
            >
                {userPage.photosPosted.map((image, index) => {
                    return (
                        <View key={index} className="pt-2">
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
                    <View key={`${shop._id}${shop.city}`}>
                        <ShopCard shop={shop} navigation={navigation} />
                    </View>
                );
            })}
        </ScrollView>
    );
}
