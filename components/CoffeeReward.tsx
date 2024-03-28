import { Text, View, Image, Pressable } from "react-native";
import { useState } from "react";
import QRCode from "react-native-qrcode-svg";

const CoffeeRewards = () => {
    //user should be retrieved from props passed down from profilepage
    const user = {
        _id: 4,
        username: "mochamonster",
        coffeeCollected: 8,
    };
    //user should be retrieved from props passed down from profilepage

    const [QR, setQR] = useState(false);
    const rewards = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <View>
            <View className="mx-3 mt-20 mb-3 h-64 bg-orange-200 rounded-md">
                <Text className="text-xl text-center tracking-widest">
                    Your Reward Card
                </Text>
                <View className="flex-wrap justify-evenly content-center items-center pb-8">
                    {rewards.map((reward, i) => {
                        return (
                            <View
                                className="mx-1.5 w-20 h-20 bg-white rounded-full"
                                key={i}
                            >
                                {i < user.coffeeCollected ? (
                                    <Image
                                        className="w-20 h-20 rounded-full"
                                        source={{
                                            uri: "https://i.ibb.co/fq9bmmw/pitr-Coffee-cup-icon-preview-05af-2.png",
                                        }}
                                    ></Image>
                                ) : null}
                            </View>
                        );
                    })}
                </View>
            </View>
            {user.coffeeCollected === 8 ? (
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
