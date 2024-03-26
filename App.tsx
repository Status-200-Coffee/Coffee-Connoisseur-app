import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoadingScreen from "./screens/LoadingScreen";
import ShopSearch from "./screens/ShopSearch";
import CitySearch from "./screens/CitySearch";
import FullscreenMap from "./screens/FullscreenMap";
import { CacheProvider } from "./contexts/Cache";

import { RootStackParamList } from "./screens/types";

export default function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <CacheProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoadingScreen"
                        component={LoadingScreen}
                    />
                    <Stack.Screen name="ShopSearch" component={ShopSearch} />
                    <Stack.Screen name="CitySearch" component={CitySearch} />
                    <Stack.Screen
                        name="FullscreenMap"
                        component={FullscreenMap}
                    />
                </Stack.Navigator>
            </CacheProvider>
        </NavigationContainer>
    );
}
