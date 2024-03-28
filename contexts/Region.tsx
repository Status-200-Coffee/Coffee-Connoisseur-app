import { createContext, useContext, useState } from "react";
import { Region } from "../types";
import { ProviderProps, RegionContextType } from "./types";

export const RegionContext = createContext<RegionContextType | null>(null);

export function RegionProvider({ children }: ProviderProps) {
    const [region, setRegion] = useState<Region>({
        latitude: 40,
        longitude: -1,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    });

    return (
        <RegionContext.Provider value={{ region, setRegion }}>
            {children}
        </RegionContext.Provider>
    );
}

export function useRegion() {
    const context = useContext(RegionContext);

    if (!context) {
        throw new Error("RegionContext not set");
    }

    return context;
}


