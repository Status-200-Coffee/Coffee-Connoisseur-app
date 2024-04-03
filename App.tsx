import { NavigationContainer } from "@react-navigation/native";

import { CacheProvider } from "./contexts/Cache";
import AppDrawerNavigator from "./navigators/DrawerNavigator";

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
