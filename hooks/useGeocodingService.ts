import { useMapContext } from "@/context/MapContext"
import * as turf from '@turf/bbox'



const NOMINATIN_BASE_URL = "https://nominatim.openstreetmap.org/search?"

export type TGeocodingResult = {
    address: {
        "ISO3166-2-lvl4": string
        city: string
        country: string
        country_code: string
        county: string
        postcode: string
        road: string
        state: string
    },
    addressType: string
    boundingbox: [string, string, string, string]
    class: string
    display_name: string
    imortance: number
    lat: string
    licence: string
    lon: string
    name: string
    osm_id: number
    osm_type: string
    place_id: number
    place_rank: number
    type: string
}
export const useGeocodingService = () => {

    const { selectedCampus } = useMapContext()

    const forwardGeocode = async (searchQuery: string) => {
        const campusBbox = turf.bbox(selectedCampus?.layer)
        const params = {
            q: searchQuery,
            format: "json",
            limit: 5,
            addressdetails: 1,
            bounded: 1,
            layer: 'address,poi',
            viewbox: `${campusBbox[0]},${campusBbox[1]},${campusBbox[2]},${campusBbox[3]}`,
        }
        const paramsString = new URLSearchParams(params).toString()
        const response = await fetch(`${NOMINATIN_BASE_URL}${paramsString}`)
        const data = await response.json() as [] | TGeocodingResult[]
        return data
    }

    return { forwardGeocode, }
}