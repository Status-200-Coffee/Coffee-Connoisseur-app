import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { DrawerProps } from "../screens/types";

export const HomeRedirect = ({ navigation }: DrawerProps<"HomeRedirect">) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        navigation.navigate("HomeStackNavigator", { screen: "ShopSearch" });
    }, [isFocused]);

    return <></>;
};

export const LoginPageRedirect = ({
    navigation,
}: DrawerProps<"LoginPageRedirect">) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        navigation.navigate("LoginPageStackNavigator", { screen: "LoginPage" });
    }, [isFocused]);

    return <></>;
};

export const ProfilePageRedirect = ({
    navigation,
}: DrawerProps<"ProfilePageRedirect">) => {
    const isFocused = useIsFocused();

    useEffect(() => {
        navigation.navigate("ProfilePageStackNavigator", {
            screen: "ProfilePage",
        });
    }, [isFocused]);

    return <></>;
};
