import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CitySearch from "../screens/CitySearch";
import CoffeeCamera from "../screens/CoffeeCamera";
import FullscreenMap from "../screens/FullscreenMap";
import LoginPage from "../screens/LoginPage";
import ProfilePage from "../screens/ProfilePage";
import ShopPage from "../screens/ShopPage";
import ShopSearch from "../screens/ShopSearch";
import SignUpPage from "../screens/SignUpPage";

import { RootStackParamList } from "../screens/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="ShopSearch"
        >
            <Stack.Screen name="ShopSearch" component={ShopSearch} />
            <Stack.Screen name="CitySearch" component={CitySearch} />
            <Stack.Screen name="FullscreenMap" component={FullscreenMap} />
            <Stack.Screen name="ShopPage" component={ShopPage} />
            <Stack.Screen name="CoffeeCamera" component={CoffeeCamera} />
        </Stack.Navigator>
    );
};

export const LoginPageStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="LoginPage"
        >
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
        </Stack.Navigator>
    );
};

export const ProfilePageStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="ProfilePage"
        >
            <Stack.Screen name="ProfilePage" component={ProfilePage} />
            <Stack.Screen name="ShopPage" component={ShopPage} />
            <Stack.Screen name="CoffeeCamera" component={CoffeeCamera} />
        </Stack.Navigator>
    );
};
