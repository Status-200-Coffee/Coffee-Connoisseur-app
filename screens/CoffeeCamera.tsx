import React from "react";
import { useState, useRef, useEffect } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CoffeeCamera() {
    const [hasCameraPermission, setHasCameraPermission] =
        useState<boolean>(false);
    const [cameraType, setCameraType] = useState(CameraType.back);
    const [capturedImage, setCapturedImage] = useState<string>("");
    const [showCamera, setShowCamera] = useState(false);
    const cameraRef = useRef<Camera>(null);

    useEffect(() => {
        (async () => {
            // MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === "granted");
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setCapturedImage(photo.uri);
        }
    };

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
