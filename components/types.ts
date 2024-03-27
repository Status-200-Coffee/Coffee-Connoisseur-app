import { CoffeeShop, Region } from "../types";
import { Props } from "../screens/types";

export type ShopMapProps = {
    initialRegion: Region;
    onPress?: () => void;
};

export type ShopListProps = {
    navigation: Props<"ShopSearch">["navigation"];
};

export type ShopCardProps = {
    shop: CoffeeShop;
    navigation: Props<"ShopSearch">["navigation"];
};
