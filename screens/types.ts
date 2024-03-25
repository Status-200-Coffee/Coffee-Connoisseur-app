import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CoffeeShop, Region, SetState } from "../types";

export type RootStackParamList = {
    ShopSearch: undefined;
    CitySearch: { setCity: SetState<string> };
    FullscreenMap: {
        coffeeShops: CoffeeShop[];
        region: Region;
        setRegion: SetState<Region>;
    };
};

export type Props<K extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    K
>;
