import ShopSearch from "./screens/ShopSearch";
import FullscreenMap from "./screens/FullscreenMap";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CitySearch from "./screens/CitySearch";

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ShopSearch" component={ShopSearch} />
                <Stack.Screen name="CitySearch" component={CitySearch} />
                <Stack.Screen name="FullscreenMap" component={FullscreenMap} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
