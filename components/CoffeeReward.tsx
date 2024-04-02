import { Text, View, Image, Pressable } from "react-native";
import { useState } from "react";
import { useCache } from "../contexts/Cache";
import QRCode from "react-native-qrcode-svg";

const CoffeeRewards = () => {
    const { cache, setCache } = useCache();
    const [QR, setQR] = useState(false);
    const rewards = [1, 2, 3, 4, 5, 6, 7, 8];
    const coffeeCollected = cache.user?.coffeeCollected

    return (
        <View>
            <View className="mx-3 mt-3 mb-3 h-64 bg-orange-200 rounded-md">
                <Text className="text-xl text-center tracking-widest">
                    Your Reward Card
                </Text>
                <View className="flex-wrap justify-evenly content-center items-center pb-8">
                    {rewards.map((reward, i) => {
                        return (
                            <View
                                className="mx-1.5 w-20 h-20 bg-white rounded-full"
                                key={i}
                            >{coffeeCollected ? 
                                i < coffeeCollected ? (
                                    <Image
                                        className="w-20 h-20 rounded-full"
                                        source={{
                                            uri: "https://i.ibb.co/fq9bmmw/pitr-Coffee-cup-icon-preview-05af-2.png",
                                        }}
                                    ></Image>
                                ) : null : null}
                            </View>
                        );
                    })}
                </View>
            </View>
            {coffeeCollected === 8 ? (
                <View className="flex-wrap justify-evenly content-center items-center pb-2">
                    <Pressable
                        className="bg-green-300 mb-2 p-2 rounded-md"
                        onPress={() => setQR((currValue) => !currValue)}
                    >
                        <Text className="text-center text-base tracking-widest">
                            {QR ? "Hide QR Code" : "Yay! Free coffee QR code"}
                        </Text>
                    </Pressable>
                    {QR ? <QRCode value={"user._id"} /> : null}
                </View>
            ) : null}
        </View>
    );
};

export default CoffeeRewards;
