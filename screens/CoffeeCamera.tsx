import { useState, useRef, useEffect } from "react";
import { Text, View, Image, Pressable, Alert } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import { Props } from "./types";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import { useCache } from "../contexts/Cache";
import { uploadPhotoToShop, uploadPhotoToUser } from "../utils/api";

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

    const { cache, setCache } = useCache();
    const [imageUploaded, setImageUploaded] = useState<boolean>(false);

    console.log(typeof shop_id);
    console.log(cache.user);
    // console.log(cache.cityShops[cache.currentCity][shop_id].userImages);

    useEffect(() => {
        (async () => {
            // MediaLibrary.requestPermissionsAsync();
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
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            if (cache.user && cache.currentCity) {
                const imgUrl = await uploadPhotoToImgur(photo.uri);
                uploadPhotoToUser(cache.user.username, imgUrl);
                uploadPhotoToShop(cache.currentCity, shop_id, imgUrl).then((shop) => {
                    const cityShops = cache.cityShops
                    

                    }
                );
                setImageUploaded(true);
                setTimeout(() => {
                    navigation.navigate("CoffeeCamera");
                    setImageUploaded(false);
                }, 1550);

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

    const findShop = () => {
        for (const shop of cache.cityShops[cache.currentCity!]) {
            if (shop._id === shop_id) {
                return shop;
            }
        }
        return null;
    };

    useEffect(() => {
        if (imageUploaded && cache.user && cache.currentCity && shop_id) {
            // Update cache for user's photo
            const updatedUser = {
                ...cache.user,
                photosPosted: [capturedImage, ...cache.user.photosPosted],
            };
            setCache((prevCache) => ({
                ...prevCache,
                user: updatedUser,
            }));
            console.log(
                "testing",
                cache.cityShops[cache.currentCity][shop_id],
                shop_id
            );

            // Update cache for shop's photo

            const updatedShop = {
                ...findShop()!,

                userImages: [...findShop()!.userImages, capturedImage],
            };
            const updatedCityShops = { ...cache.cityShops };
            updatedCityShops[city];
            setCache((prevCache) => ({
                ...prevCache,
                cityShops: {
                    ...prevCache.cityShops,
                    [cache.currentCity]: {
                        ...prevCache.cityShops[cache.currentCity],
                        [shop_id]: updatedShop,
                    },
                },
            }));
        }
    }, [imageUploaded]);

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
                    <Pressable onPress={takePicture}>
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
