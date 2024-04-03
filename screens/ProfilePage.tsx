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
        let favShops: number[];

        console.log("user", username);

        getUser(username!)
            .then((user) => {
                console.log(">>>>", user);
                setUserPage(user);
                favShops = user.favouriteShops;
                return getShopsByCity(cache.currentCity!, "", "");
            })
            .then((shops) => {
                const filteredShops = shops.filter(function (item) {
                    return favShops.indexOf(item._id) !== -1;
                });
                return filteredShops;
            })
            .then((filteredShops) => {
                return setShopList(filteredShops);
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [username]);

    function handleLogout() {
        setCache((currentCache) => {
            return {...currentCache, user: null};
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
                    <View key={shop._id}>
                        <ShopCard shop={shop} navigation={navigation} />
                    </View>
                );
            })}
        </ScrollView>
    );
}
