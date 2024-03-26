import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShopList from "./components/ShopList";
import ShopPage from "./components/ShopPage";
import CoffeeCamera from "./components/CoffeeCamera";

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ShopList" component={ShopList} />
        <Stack.Screen name="ShopPage" component={ShopPage} />
        <Stack.Screen name="CoffeeCamera" component={CoffeeCamera}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
