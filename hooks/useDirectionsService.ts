import { TLocation, } from "@/context/MapContext"


// Giving that it'll be on campus, walking direction makes sense.
// reference - https://docs.mapbox.com/api/navigation/directions/
const MAPBOX_DIRECTIONS_API = "https://api.mapbox.com/directions/v5/mapbox/"

export type TDirections = {
    code: string
    routes: {
        distance: number,
        duration: number
        geometry: any[]
        legs: any[]
        voiceLocale: string
        weight: number
        weight_name: string
    }[]
    waypoints: {
        "distance": number
        location: any[]
        name: string
    }[]
    uuid: string

}
export const useMapboxDirectionsService = () => {
    const getDirections = async (origin: TLocation, destination: TLocation, activeMode: 'walking' | 'driving') => {
        const params = {
            geometries: "geojson",
            language: 'en',
            overview: 'full',
            steps: true,
            access_token: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN,
        }
        const paramsString = new URLSearchParams(params).toString()
        const response = await fetch(`${MAPBOX_DIRECTIONS_API}${activeMode}/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?${paramsString}`)
        const data = await response.json() as TDirections
        return data
    }

    return { getDirections }
}