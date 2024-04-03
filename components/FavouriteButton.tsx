import { Modal, Pressable, Text, View } from "react-native";
import { AntDesign, Fontisto } from "@expo/vector-icons";

import { useCache } from "../contexts/Cache";
import { addFavouriteShop, removeFavouriteShop } from "../utils/api";
import * as Animatable from "react-native-animatable";

import { FavouriteButtonProps } from "./types";
import { useState } from "react";

export default function FavouriteButton({
    city,
    shopId,
    navigation,
}: FavouriteButtonProps) {
    const { cache, setCache } = useCache();

    const [modalVisible, setModalVisible] = useState(false);

    function handleAddFavourite() {
        if (!cache.user) {
            setModalVisible(true);
            return;
        }

        addFavouriteShop(cache.user!.username, city, shopId)
            .then((user) => {
                console.log(user.favouriteShops);
                if (cache.user === null) return loginPopup;

                setCache((currentCache) => {
                    return { ...currentCache, user };
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleRemoveFavourite() {
        if (!cache.user) {
            setModalVisible(true);
            return;
        }

        removeFavouriteShop(cache.user!.username, city, shopId)
            .then((user) => {
                console.log(user.favouriteShops);

                setCache((currentCache) => {
                    return { ...currentCache, user };
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function shopIsFavourited() {
        if (cache.user === null) return false;

        return cache.user!.favouriteShops[city].includes(shopId);
    }

    const loginPopup = (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View className="m-3 flex-1 pb-5 justify-center border-slate-700 bg-sky-100 border-2 rounded items-center">
                <View className="m-3 items-center justify-center">
                    <Text className="m-2 font-bold text-xl text-center">
                        Login or create an account to add this shop to your
                        favourites
                    </Text>
                    <Fontisto name="coffeescript" size={24} color="#FF3368" />
                </View>
                <Animatable.View animation="zoomIn" duration={1500}>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("LoginPageStackNavigator", {
                                screen: "LoginPage",
                            });
                            setModalVisible(false);
                        }}
                    >
                        <Text className="m-2 p-2 pr-12 pl-12 bg-blue-900 rounded-full text-center font-bold text-white text-base">
                            Login
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate("LoginPageStackNavigator", {
                                screen: "SignUpPage",
                            });
                            setModalVisible(false);
                        }}
                    >
                        <Text className="m-2 p-2 pr-12 pl-12 bg-blue-900 rounded-full text-center font-bold text-white text-base">
                            Sign up
                        </Text>
                    </Pressable>
                </Animatable.View>
            </View>
        </Modal>
    );

    return (
        <View>
            {!cache.user && loginPopup}

            {shopIsFavourited() ? (
                <Animatable.View animation="shake" duration={3000}>
                    <Pressable onPress={handleRemoveFavourite}>
                        <AntDesign name="heart" size={28} color="purple" />
                    </Pressable>
                </Animatable.View>
            ) : (
                <Pressable onPress={handleAddFavourite}>
                    <AntDesign name="heart" size={30} color="#FF3368" />
                </Pressable>
            )}
        </View>
    );
}
