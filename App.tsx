import { NavigationContainer } from "@react-navigation/native";
import { CacheProvider } from "./contexts/Cache";
import AppDrawerNavigator from "./DrawerNavigator";

const App = () => {
    return (
        <NavigationContainer>
            <CacheProvider>
                <AppDrawerNavigator />
            </CacheProvider>
        </NavigationContainer>
    );
};

export default App;