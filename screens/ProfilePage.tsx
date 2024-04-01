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
import CoffeeRewards from "../components/CoffeeReward";

export default function ProfilePage({
    navigation,
    route,
}: Props<"ProfilePage">) {
    const { cache, setCache } = useCache();
    const currShops = cache.cityShops
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
  


    const [loaded, setLoaded] = useState<boolean>(false);
    

    const [shopList, setShopList] = useState<CoffeeShop[]>([]);
    const [filteredShopList, setFilteredShopList] = useState<CoffeeShop[]>([]);


useCache
    const username = "easter";
    // const { username } = route.params;
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
        const currentCity = cache.currentCity || "Carlisle";
       
            axios
            .get(
                `https://coffee-connoisseur-api.onrender.com/api/users/${username}`
            )
            .then(({ data: { user } }) => {
                console.log(user)
                setUserPage(user);

                // setIsLoading(false);
                // console.log(userPage.favouriteShops)

                const favShops = userPage.favouriteShops
            
            getShopsByCity(currentCity, "", "").then((shop) => {
                console.log("test1a",shop)
                
                const filtered = shop.filter(function(item) {
                    return favShops.indexOf(item._id) !== -1  ;
                })
                console.log("test1b",filtered)
                return filtered
               
            })
            .then (data => {
                console.log("test3",data)
                      setShopList(data); 
            })

   
        })
        .catch(error => console.log(error))

    }, []);

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
            <CoffeeRewards></CoffeeRewards>
            
            <ScrollView className="flex 1"
                 
            >
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
