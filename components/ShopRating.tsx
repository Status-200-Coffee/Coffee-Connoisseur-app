import React, { useEffect, useState } from "react";
import StarRating from "react-native-star-rating-widget";
import * as Animatable from "react-native-animatable";
import { Fontisto, Entypo } from "@expo/vector-icons";

import { useCache } from "../contexts/Cache";
import { updateShopRating } from "../utils/api";

import { ShopRatingProps } from "./types";
import { Modal, Pressable, View, Text } from "react-native";

export default function ShopRating({
    shop_id,
    setRating,
    setVotes,
    shopPage,
    navigation
}: ShopRatingProps) {
    const { cache } = useCache();
    const [userRating, setUserRating] = useState(shopPage.userVote);
    const [userHasVoted, setUserHasVoted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const loginPopup = (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View className="mx-10 my-48 flex-1 pb-5 justify-center border-slate-700 bg-sky-100 border-2 rounded items-center">
                <View className="m-3 items-center justify-center">
                    <Pressable
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Entypo name="cross" size={32} color="black" />
                    </Pressable>
                    <Text className="m-2 font-bold text-xl text-center">
                        Login or create an account to rate this shop!
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

    const handleRating = async (stars: number) => {
        if (!cache.user) {
            setModalVisible(true);
            return;
        }
        setUserHasVoted(true);
        setUserRating(stars);
        if (!userHasVoted && !userRating) {
            const update = await updateShopRating(
                cache.currentCity!,
                shop_id,
                stars
            );
            setRating(update.rating);
            setVotes(update.totalRatings);
            shopPage.rating = update.rating;
            shopPage.totalRatings = update.totalRatings;
        }
        shopPage.userVote = stars;
    };

    useEffect(() => {}, [userRating]);

    return (
        <View pointerEvents={userHasVoted ? "none" : "auto"}>
            {!cache.user && loginPopup}
            <StarRating
                enableHalfStar={false}
                maxStars={5}
                rating={userRating ? userRating : 0}
                onChange={(stars: number) => handleRating(stars)}
            />
        </View>
    );
}
