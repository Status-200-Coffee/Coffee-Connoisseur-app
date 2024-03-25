import * as Location from "expo-location";
import { SetState, UserLocation } from "../types";

export async function getUserLocation(
    setLocation: SetState<UserLocation | undefined>,
    setErrorMsg: SetState<string>
) {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
        setErrorMsg("Permission Denied: location");
        return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { longitude, latitude } = location.coords;

    console.log(longitude, latitude);

    setLocation({ longitude, latitude });
}
