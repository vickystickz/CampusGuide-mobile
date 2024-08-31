import { basemapStyles, CampusDataType, TBasemapStyle } from "@/utils/data";
import React, { createContext, useContext, useMemo, useState } from "react";


export type TLocation = {
    latitude: number | undefined
    longitude: number | undefined
}
type TMapContext = {
    basemapStyle: TBasemapStyle
    setBasemapStyle: (v: TBasemapStyle) => void
    userCurrentLocation: TLocation
    setUserCurrentLocation: (b: TLocation) => void
    selectedCampus?: CampusDataType
    setSelectedCampus?: (b: CampusDataType) => void
    routeOrigin: TLocation
    setRouteOrigin: (b: TLocation) => void
    routeDestination: TLocation
    setRouteDestination: (b: TLocation) => void
    currentRoute: any
    setCurrentRoute: (v: any) => void
}
const MapContext = createContext<TMapContext>({
    basemapStyle: {
        name: "",
        styleURL: "",
        image: undefined
    },
    setBasemapStyle: function (v: TBasemapStyle): void {
        throw new Error("Function not implemented.");
    },
    userCurrentLocation: {
        latitude: 0,
        longitude: 0,

    },
    setUserCurrentLocation: function (v: TLocation): void {
        throw new Error("Function not implemented.");
    },
    selectedCampus: undefined,
    setSelectedCampus: undefined,
    setRouteDestination: function (v: TLocation): void {
        throw new Error("Function not implemented.");
    },
    setRouteOrigin: function (v: TLocation): void {
        throw new Error("Function not implemented.");
    },
    routeDestination: {
        latitude: 0,
        longitude: 0,

    },
    routeOrigin: {
        latitude: 0,
        longitude: 0,

    },
    currentRoute: undefined,
    setCurrentRoute: function (v: any): void {
        throw new Error("Function not implemented.");
    },
})

export const useMapContext = () => useContext(MapContext)


const MapProvider = ({ children }: { children: React.ReactNode }) => {
    // Default to the first basemap style i.e OpenStreetMap
    const [basemapStyle, setBasemapStyle] = useState(basemapStyles[0])
    const [userCurrentLocation, setUserCurrentLocation] = useState<TLocation>({ latitude: undefined, longitude: undefined })
    const [routeOrigin, setRouteOrigin] = useState<TLocation>({ latitude: undefined, longitude: undefined })
    const [routeDestination, setRouteDestination] = useState<TLocation>({ latitude: undefined, longitude: undefined })
    const [selectedCampus, setSelectedCampus] = useState<CampusDataType | undefined>(undefined)
    const [currentRoute, setCurrentRoute] = useState<undefined>(undefined)
    const value = useMemo(() => {
        return {
            basemapStyle,
            setBasemapStyle,
            userCurrentLocation,
            setUserCurrentLocation,
            selectedCampus,
            setSelectedCampus,
            routeDestination,
            setRouteDestination,
            routeOrigin,
            setRouteOrigin,
            currentRoute,
            setCurrentRoute
        }
    },
        [basemapStyle, userCurrentLocation, selectedCampus, routeDestination, routeOrigin, currentRoute, setCurrentRoute])

    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    )
}

export default MapProvider;