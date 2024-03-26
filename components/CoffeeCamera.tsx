import { StyleSheet, Text, View, Button, Image } from "react-native";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CoffeeCamera() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const cameraRef = useRef(null);
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
    <View style={styles.container}>
   
      {hasCameraPermission === true && (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.back}
          />
          <Button title="Take Picture" onPress={takePicture} />
        </View>
      )}

     
      {capturedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: capturedImage }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    width: "70%",
    height: "30%",
  },
  camera: {
    flex: 1,
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});
