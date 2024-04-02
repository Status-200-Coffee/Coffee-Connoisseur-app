import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackNavigator from "./StackNavigator";
import ShopSearch from "./screens/ShopSearch";
import LoginPage from "./screens/LoginPage";
import ProfilePage from "./screens/ProfilePage";
import { useCache } from "./contexts/Cache";

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
    const { cache, setCache } = useCache();
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeStackNavigator} />
            <Drawer.Screen name="ShopSearch" component={ShopSearch} />
            {!cache.user ? (
                <Drawer.Screen name="LoginPage" component={LoginPage} />
            ) : (
                <Drawer.Screen name="ProfilePage" component={ProfilePage} />
            )}
        </Drawer.Navigator>
    );
};

export default AppDrawerNavigator;
