import GeolocationIcon from "@/components/icons/GeolocationIcon";
import { StyledText } from "@/components/StyledText";
import { StyledView } from "@/components/StyledView";
import { FlatList, Keyboard, Pressable, SafeAreaView, TextInput, } from "react-native";
import { useMapContext } from "@/context/MapContext";
import LocationCircleIcon from "@/components/LocationCircleIcon";
import GeolocationRequiredModal from "@/components/modals/GeolocationRequiredModal";
import { useGeolocation } from "@/hooks/useGeolocation";
import DirectionSwitchIcon from "@/components/icons/DirectionSwitchIcon";
import { useEffect, useState } from "react";
import GeocodingResultListItem from "@/components/GeocodingResultListItem";
import CampusNotFoundIllustrationIcon from "@/components/icons/NotOnCampusIllustrationIcon";
import { TGeocodingResult, useGeocodingService } from "@/hooks/useGeocodingService";
import { useNavigation } from "expo-router";
import { ROUTES } from "@/utils/data";
import useDebounce from "@/hooks/useDebounce";




export default function DirectionsPage() {
    const { userCurrentLocation, setRouteDestination, setRouteOrigin, routeDestination, routeOrigin, setCurrentRoute } = useMapContext()
    const { goToSettings, handleGeolocation, modalVisible, setModalVisible } = useGeolocation()
    const [originInputIsFocused, setOriginInputIsFocused] = useState(false);
    const [destinationInputIsFocused, setDestinationInputIsFocused] = useState(false);
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')

    const [geocodingSearchResult, setGeocodingSearchResults] = useState<TGeocodingResult | []>([])

    const { forwardGeocode } = useGeocodingService()

    const handleGeolocationButtonPress = async () => {
        // get and set the user location in context
        await handleGeolocation()
        // check the current active input and update the text of the input and origin/destination accordingly
        if (originInputIsFocused) {
            setOrigin('My Location')
            setRouteOrigin(userCurrentLocation)
        } else if (destinationInputIsFocused) {
            setDestination('My Location')
            setRouteDestination(userCurrentLocation)
        }
    }

    const debouncedSearch = useDebounce(async (searchQuery: string) => {
        const response = await forwardGeocode(searchQuery)
        setGeocodingSearchResults(response)
    }, 500); // Debounce delay of 500ms


    useEffect(() => {
        if (originInputIsFocused) {
            if (!origin) return
            debouncedSearch(origin);
        } else {
            if (!destination) return
            debouncedSearch(destination);
        }
    }, [origin, destination, debouncedSearch]);

    const noSearchResult = (origin.length > 2 || destination.length > 2)
        && geocodingSearchResult.length === 0;

    const navigation = useNavigation()

    useEffect(() => {
        // once there is both origin and destination location
        // navigate the user to the route page.
        if (!(routeOrigin.latitude && routeOrigin.longitude)) return
        if (!(routeDestination.latitude && routeDestination.longitude)) return
        navigation.navigate(ROUTES.ROUTE)
    }, [routeDestination.latitude, routeDestination.longitude, routeOrigin.latitude, routeOrigin.longitude])

    useEffect(() => {
        //clear any old route incase the user goes back to this page
        setCurrentRoute(undefined)
        setRouteDestination({
            latitude: undefined,
            longitude: undefined
        })
        setRouteOrigin({
            latitude: undefined,
            longitude: undefined
        })
    }, [])
    return (
        <SafeAreaView>
            {/* Geolocation required modal */}
            <GeolocationRequiredModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                openSettings={goToSettings}
            />
            <StyledView className="w-full bg-white h-screen">
                <Pressable onPress={() => {
                    // Disable the input activeness when the user clicks 
                    // anywhere outside the input region
                    setDestinationInputIsFocused(false)
                    setOriginInputIsFocused(false)
                    // Close the keyboard
                    Keyboard.dismiss()
                }}>
                    <StyledView className="px-4 flex flex-col gap-y-6 py-4">
                        <StyledView className="flex flex-row items-center justify-between">
                            <StyledView>
                                {/* Origin */}
                                <StyledView className="flex flex-row gap-x-4 items-center w-full">
                                    <StyledView>
                                        <LocationCircleIcon variant="purple" />
                                    </StyledView>
                                    <StyledView className={`px-[10px] py-3 rounded-t-3xl w-[85%] ${originInputIsFocused ? 'bg-white border border-p75' : 'bg-[#F4F6F8]'}`}>
                                        <TextInput
                                            placeholder={`Choose origin`}
                                            placeholderTextColor='#18002C'
                                            onFocus={() => {
                                                setDestinationInputIsFocused(false)
                                                setOriginInputIsFocused(true)
                                            }}
                                            onChangeText={(text) => {
                                                setOrigin(text)
                                            }}


                                        >
                                            {
                                                origin &&
                                                <StyledText>
                                                    {origin}
                                                </StyledText>
                                            }
                                        </TextInput>
                                    </StyledView>
                                </StyledView>

                                {/* Destination */}
                                <StyledView className="flex flex-row gap-x-4 items-center w-full">
                                    <StyledView>
                                        <LocationCircleIcon variant="red" />
                                    </StyledView>
                                    <StyledView className={`px-[10px] py-3 rounded-b-3xl w-[85%] ${destinationInputIsFocused ? 'bg-white border border-p75' : 'border-t border-[#E8E6EA]  bg-[#F4F6F8]'}`}>
                                        <TextInput
                                            placeholder={`Choose destination`}
                                            placeholderTextColor='#18002C'
                                            onFocus={() => {
                                                setDestinationInputIsFocused(true);
                                                setOriginInputIsFocused(false);
                                            }}
                                            onChangeText={(text) => {
                                                setDestination(text)
                                            }}
                                        >
                                            {
                                                destination && <StyledText>
                                                    {destination}
                                                </StyledText>
                                            }
                                        </TextInput>
                                    </StyledView>
                                </StyledView>
                            </StyledView>
                            <Pressable>
                                <DirectionSwitchIcon className="w-4 h-4 text-b200" />
                            </Pressable>
                        </StyledView>
                        <Pressable onPress={handleGeolocationButtonPress} className="flex flex-row gap-x-4 items-center w-full">
                            <StyledView className="bg-white shadow-2xl shadow-black p-1 w-6 rounded-full h-6 flex items-center justify-center">
                                <GeolocationIcon className="w-4 h-4 text-p300" />
                            </StyledView>
                            <StyledText className="text-b300 text-[16px]">Use my current location</StyledText>
                        </Pressable>
                    </StyledView>
                </Pressable>
                <StyledView className="border-t border-[#E8E6EA] p-4 bg-[#F4F6F8] h-full">
                    {
                        geocodingSearchResult.length > 0 ?
                            <FlatList
                                data={geocodingSearchResult}
                                renderItem={({ item }) =>
                                    <GeocodingResultListItem
                                        searchResult={item}
                                        source={originInputIsFocused ? 'origin' : 'destination'}
                                        setOrigin={setOrigin}
                                        setDestination={setDestination}
                                    />}
                                keyExtractor={item => item.osm_id}
                            /> : noSearchResult ?
                                <StyledView className="items-center flex flex-col gap-y-4">
                                    <StyledView className="flex items-center justify-center bg-p50 rounded-full w-24 h-24">
                                        <CampusNotFoundIllustrationIcon className="w-10 h-16" />
                                    </StyledView>
                                    <StyledText className="text-center">Can't seem to find a result for your query.</StyledText>
                                    <StyledText className="text-center">Try another query.</StyledText>
                                </StyledView> : null
                    }
                </StyledView>
            </StyledView>
        </SafeAreaView>
    );
}


