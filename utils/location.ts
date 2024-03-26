import * as Location from "expo-location";
import { UserLocation } from "../types";

export async function getUserLocation(): Promise<UserLocation | null> {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
        console.log("Could not retrieve user location");
        return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    return { latitude, longitude };
}
