import { CoffeeShop, Region } from "../types";
import { Props } from "../screens/types";

export type ShopMapProps = {
    initialRegion: Region;
    onPress?: () => void;
    navigation: Props<"ShopSearch" | "FullscreenMap">["navigation"];
};

export type ShopListProps = {
    navigation: Props<"ShopSearch">["navigation"];
};

export type ShopCardProps = {
    shop: CoffeeShop;
    navigation: Props<"ShopSearch">["navigation"];
};