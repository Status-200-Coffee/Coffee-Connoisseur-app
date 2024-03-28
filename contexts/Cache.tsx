import { createContext, useContext, useState } from "react";
import { Cache, CacheContextType, ProviderProps } from "./types";

export const CacheContext = createContext<CacheContextType | null>(null);

export function CacheProvider({ children }: ProviderProps) {
    const [cache, setCache] = useState<Cache>({
        currentCity: null,
        cities: {},
        cityShops: {},
        userLocation: null,
        user: null
    });

    return (
        <CacheContext.Provider value={{ cache, setCache }}>
            {children}
        </CacheContext.Provider>
    );
}

export function useCache() {
    const context = useContext(CacheContext);

    if (!context) {
        throw new Error("CacheContext not set");
    }

    return context;
}
