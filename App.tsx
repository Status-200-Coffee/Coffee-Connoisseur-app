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
import LoginPage from "./screens/LoginPage";
import SignUpPage from "./screens/SignUpPage";

import { useState } from "react";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <CacheProvider>
        <Stack.Navigator>
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} />

          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />

          <Stack.Screen name="ShopSearch" component={ShopSearch} />
          <Stack.Screen name="CitySearch" component={CitySearch} />
          <Stack.Screen name="FullscreenMap" component={FullscreenMap} />
          <Stack.Screen name="ShopPage" component={ShopPage} />
          <Stack.Screen name="CoffeeCamera" component={CoffeeCamera} />
        </Stack.Navigator>
      </CacheProvider>
    </NavigationContainer>
  );
}
