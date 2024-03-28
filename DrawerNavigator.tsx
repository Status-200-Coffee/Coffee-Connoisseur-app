import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from "./StackNavigator";
import ShopSearch from "./screens/ShopSearch";

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeStackNavigator} />
            <Drawer.Screen name="ShopSearch" component={ShopSearch} />
        </Drawer.Navigator>
    );
};

export default AppDrawerNavigator;