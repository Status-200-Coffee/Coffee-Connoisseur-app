import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoadingScreen from "./screens/LoadingScreen";
import ShopSearch from "./screens/ShopSearch";
import CitySearch from "./screens/CitySearch";
import FullscreenMap from "./screens/FullscreenMap";
import { CacheProvider } from "./contexts/Cache";

import { RootStackParamList } from "./screens/types";
import ShopPage from "./screens/ShopPage";
import CoffeeCamera from "./screens/CoffeeCamera";

export default function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <CacheProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoadingScreen"
                        component={LoadingScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="ShopSearch" component={ShopSearch} />
                    <Stack.Screen name="CitySearch" component={CitySearch} />
                    <Stack.Screen
                        name="FullscreenMap"
                        component={FullscreenMap}
                    />
                    <Stack.Screen name="ShopPage" component={ShopPage} />
                    <Stack.Screen
                        name="CoffeeCamera"
                        component={CoffeeCamera}
                    />
                </Stack.Navigator>
            </CacheProvider>
        </NavigationContainer>
    );
}
