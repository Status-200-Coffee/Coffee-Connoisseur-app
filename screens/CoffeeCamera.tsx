import { useState, useRef, useEffect } from "react";
import { Text, View, Image, Pressable, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { Camera, CameraType } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

import { useCache } from "../contexts/Cache";
import { uploadPhotoToShop, uploadPhotoToUser } from "../utils/api";

import { Props } from "./types";

export default function CoffeeCamera({
    navigation,
    route,
}: Props<"CoffeeCamera">) {
    const [hasCameraPermission, setHasCameraPermission] =
        useState<boolean>(false);
    const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
    const [capturedImage, setCapturedImage] = useState<string>("");
    const [showCamera, setShowCamera] = useState<boolean>(false);
    const cameraRef = useRef<Camera>(null);
    const { city, shop_id } = route.params;
    const [buttonDisable, setButtonDisabled] = useState<boolean>(false);

    const { cache, setCache } = useCache();
    const [imageUploaded, setImageUploaded] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === "granted");
        })();
    }, []);

    async function uploadPhotoToImgur(uri: string): Promise<string> {
        try {
            const formData = new FormData();
            const file = {
                uri,
                type: "image/jpeg",
                name: "image.jpg",
            };

            formData.append("image", file as Blob);

            const response = await axios.post(
                "https://api.imgur.com/3/upload",
                formData,
                {
                    headers: {
                        Authorization: "Client-ID b698b10546842ed",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const imgUrl = response.data.data.link;
            console.log("Photo uploaded successfully to Imgur:", imgUrl);
            return imgUrl;
        } catch (error) {
            console.error("Error uploading photo to Imgur:", error);
            throw new Error("Failed to upload photo to Imgur");
        }
    }

    async function takePicture() {
        setButtonDisabled(true);
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            if (cache.user && cache.currentCity) {
                try {
                    const imgUrl = await uploadPhotoToImgur(photo.uri);

                    uploadPhotoToUser(cache.user.username, imgUrl)
                        .then((user) => {
                            setCache((currentCache) => {
                                return { ...currentCache, user };
                            });

                            return uploadPhotoToShop(city, shop_id, imgUrl);
                        })
                        .then((shop) => {
                            const newCityShops = { ...cache.cityShops };

                            const shops = newCityShops[city];

                            for (const shopCopy of shops) {
                                if (shopCopy._id === shop_id) {
                                    shopCopy.userImages = shop.userImages;
                                    break;
                                }
                            }

                            newCityShops[city] = shops;

                            setCache((currentCache) => {
                                return {
                                    ...currentCache,
                                    cityShops: newCityShops,
                                };
                            });
                        })
                        .then(() => {
                            setImageUploaded(true);
                            setTimeout(() => {
                                setImageUploaded(false);
                            }, 1550);
                            setButtonDisabled(false);
                            navigation.goBack();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } catch (error) {
                    Alert.alert(
                        "Error",
                        "Photo was not uploaded. Please try again",
                        [
                            {
                                text: "OK",
                                onPress: () => console.log("OK Pressed"),
                            },
                        ],
                        { cancelable: false }
                    );
                }
            } else {
                Alert.alert(
                    "Not Logged in",
                    "You need to be logged in to upload an image",
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                    { cancelable: false }
                );
            }
        }
    }

    if (imageUploaded) {
        return (
            <View className="flex-1 items-center justify-center">
                <Animatable.View
                    animation="fadeInDown"
                    duration={1000}
                    className="bg-black p-4 rounded-3xl mb-10"
                >
                    <Text className="text-white text-lg pb-2">
                        Photo uploaded
                    </Text>
                    <AntDesign
                        name="checkcircle"
                        size={30}
                        color="white"
                        style={{ paddingLeft: 50 }}
                    />
                </Animatable.View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white items-center">
            {hasCameraPermission === true && (
                <View className="flex-1 width-70 height-30">
                    <Camera
                        ref={cameraRef}
                        style={{ width: 400, height: 400 }}
                        type={CameraType.back}
                    />
                    <Pressable onPress={takePicture} disabled={buttonDisable}>
                        <View className="m-3 p-3 bg-sky-900 rounded-full mb-5 mx-20">
                            <Text className="text-center font-bold text-white text-lg">
                                Take picture 📷
                            </Text>
                        </View>
                    </Pressable>
                </View>
            )}

            {capturedImage && (
                <View>
                    <Image
                        source={{ uri: capturedImage }}
                        style={{ width: 200, height: 200 }}
                    />
                </View>
            )}
        </View>
    );
}
