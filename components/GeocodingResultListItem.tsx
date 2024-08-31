import { Pressable } from "react-native"
import { StyledView } from "./StyledView"
import TruncatedText from "./TruncatedText"
import { TGeocodingResult } from "@/hooks/useGeocodingService"
import LocationMarkerIcon from "./icons/LocationMarkerIcon"
import { useMapContext } from "@/context/MapContext"




const GeocodingResultListItem = ({ searchResult, source, setOrigin, setDestination }: { searchResult: TGeocodingResult, source: 'origin' | 'destination', setOrigin: (v: string) => void, setDestination: (v: string) => void }) => {
    const { setRouteDestination, setRouteOrigin } = useMapContext()
    const transformedLocation = {
        latitude: Number(searchResult.lat),
        longitude: Number(searchResult.lon)
    }
    return (
        <Pressable onPress={() => {
            if (source == 'origin') {
                setOrigin(searchResult.display_name)
                setRouteOrigin(transformedLocation)
            } else {
                setDestination(searchResult.display_name)
                setRouteDestination(transformedLocation)
            }
        }}>
            <StyledView className="flex flex-row items-center gap-x-5 my-3">
                <LocationMarkerIcon className="w-6 pl-2 h-6 text-b75" />
                <StyledView>
                    <TruncatedText text={searchResult.display_name} maxLength={45} customStyle="text-b300 text-sm" />
                </StyledView>
            </StyledView>
        </Pressable>
    )
}

export default GeocodingResultListItem;