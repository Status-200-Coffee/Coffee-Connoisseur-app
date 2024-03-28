import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./screens/LoadingScreen";
import ShopSearch from "./screens/ShopSearch";
import CitySearch from "./screens/CitySearch";
import FullscreenMap from "./screens/FullscreenMap";
import ShopPage from "./screens/ShopPage";
import CoffeeCamera from "./screens/CoffeeCamera";
import { RootStackParamList } from "./screens/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="LoadingScreen">
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="ShopSearch" component={ShopSearch} />
            <Stack.Screen name="CitySearch" component={CitySearch} />
            <Stack.Screen name="FullscreenMap" component={FullscreenMap} />
            <Stack.Screen name="ShopPage" component={ShopPage} />
            <Stack.Screen name="CoffeeCamera" component={CoffeeCamera} />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;
