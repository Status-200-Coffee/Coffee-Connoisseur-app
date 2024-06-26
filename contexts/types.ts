import { ReactNode } from "react";
import {
    CityRegions,
    CityShops,
    Region,
    SetState,
    User,
    UserLocation,
} from "../types";

export type Cache = {
    currentCity: string | null;
    cities: CityRegions;
    cityShops: CityShops;
    userLocation: UserLocation | null;
    user: User | null;
};

export type CacheContextType = {
    cache: Cache;
    setCache: SetState<Cache>;
};

export type RegionContextType = {
    region: Region;
    setRegion: SetState<Region>;
};

export type ProviderProps = {
    children: ReactNode;
};
