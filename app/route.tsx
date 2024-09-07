import BasemapSwitcherModal from "@/components/BasemapSwitcher";
import IconComponent from "@/components/IconComponent";
import BasemapIcon from "@/components/icons/BasemapIcon";
import GeolocationIcon from "@/components/icons/GeolocationIcon";
import MapComponent from "@/components/MapComponent";
import { StyledText } from "@/components/StyledText";
import { StyledView } from "@/components/StyledView";
import { useBottomSheetModal } from "@/hooks/useBottomSheetModal";
import { Pressable, SafeAreaView, Share, } from "react-native";
import { useEffect, useState, } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import ShareIcon from "@/components/icons/ShareIcon";
import StartNavigationIcon from "@/components/icons/StartNavigationIcon";
import { useMapboxDirectionsService } from "@/hooks/useDirectionsService";
import { useMapContext } from "@/context/MapContext";
import WalkingModeIcon from "@/components/icons/WalkingModeIcon";
import CarModeIcon from "@/components/icons/CarModeIcon";
import { metersToKM, secondsToMinutesAndHour } from "@/utils/converters";
import DurationIcon from "@/components/icons/DurationIcon";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { useShare } from "@/hooks/useShare";


export default function RoutingPage() {

    const {
        snapPoints,
        bottomSheetModalRef,
        handlePresentModalPress: handleBaseMapSwitcher,
        closeModal
    } = useBottomSheetModal();
    const [fetchingRoute, setFetchingRoute] = useState(false);
    const { routeDestination, routeOrigin, setCurrentRoute } = useMapContext();
    const { getDirections } = useMapboxDirectionsService();
    const [distance, setDistance] = useState(0)
    const [distanceUnit, setDistanceUnit] = useState('m')
    const [duration, setDuration] = useState(0)
    const [durationUnit, setDurationUnit] = useState('minutes')
    const [activeMode, setActiveMode] = useState<'walking' | 'driving'>('walking')
    const { encode } = useShare()
    // TODO - The intersection information is required to use the appropriate icon.

    const [routeDetails, setRouteDetails] = useState([])
    const [showRouteDetails, setShowRouteDetails] = useState(false)

    useEffect(() => {
        setFetchingRoute(true)

        const getRoutes = async () => {

            const directions = await getDirections(routeOrigin, routeDestination, activeMode)

            setFetchingRoute(false)

            // update route details
            setRouteDetails(directions.routes[0].legs[0].steps)
            // Update route
            setCurrentRoute(directions.routes[0].geometry)

            const totalDistance = directions.routes[0].distance
            const { distance, unit: distanceUnit } = metersToKM(totalDistance)
            setDistance(distance)
            setDistanceUnit(distanceUnit)
            // Assumes duration is in seconds.
            const totalDurations = directions.routes[0].duration
            const { time, unit } = secondsToMinutesAndHour(totalDurations)
            setDuration(time)
            setDurationUnit(unit)
        }
        getRoutes()
    }, [activeMode])

    const handleRouteShare = async () => {
        // Highest resolution possible for better accuracy.

        // get origin and destination
        const route = encode([`${routeOrigin.longitude},${routeOrigin.latitude}`, `${routeDestination.longitude},${routeDestination.latitude}`])
        // trigger the device default share modal
        // When the user visits this URL, if they have the app installed,
        // It can be triggered using the apps identifier, i.e the app scheme in the app.json which is 'campusguide'.
        // Otherwise, they can also continue the trip on the web.
        // TODO - Update the route accordingly to suit the path on the web.
        // TODO - In the index.tsx, a useEffect will be required to grab the h3 indexes from the url state using expo router
        // Then it'll be decoded and the routeOrigin and routeDestination will be sent in the State
        // Then the user will be rerouted to the route page using navigation.navigate()

        await Share.share({
            message: `${process.env.EXPO_PUBLIC_WEBSITE_URL}map?route=${route}`,
            title: 'Share route',
        },
            { dialogTitle: 'Share route' })
    }

    const { handleGeolocation, } = useGeolocation()

    return (
        <SafeAreaView>
            {/* Basemap switcher modal */}
            <BasemapSwitcherModal
                snapPoints={snapPoints}
                bottomSheetModalRef={bottomSheetModalRef}
                closeModal={closeModal}
            />
            {/* Map  Component */}
            <MapComponent>
                {/* Basemap Swtich and Geolocation */}
                <StyledView className="flex flex-col gap-y-6 bottom-[300px] right-0 absolute pr-6">
                    <Pressable onPress={handleGeolocation}>
                        <StyledView>
                            <IconComponent Icon={GeolocationIcon} variant="fill" />
                        </StyledView>
                    </Pressable>
                    <Pressable onPress={handleBaseMapSwitcher}>
                        <StyledView>
                            <IconComponent Icon={BasemapIcon} variant="stroke" />
                        </StyledView>
                    </Pressable>
                </StyledView>

                {/* Bottom Panel */}
                <StyledView className="absolute bg-white min-h-[200px] left-0 bottom-0 w-full ">
                    {
                        fetchingRoute ?
                            <StyledView className="w-full h-full  flex items-center justify-center bg-white">
                                <StyledText>Loading route information...</StyledText>
                            </StyledView> :
                            <StyledView className="flex flex-col h-full justify-between">
                                <StyledView className={`flex flex-row items-end justify-between px-4 py-[10px]`}>
                                    <StyledView className="flex flex-row items-center gap-x-4">
                                        <StyledView className="flex flex-row gap-x-2 items-center">
                                            <Pressable onPress={() => setActiveMode('driving')}>
                                                <StyledView className={`w-10 rounded-full h-10 flex items-center justify-center ${activeMode === 'driving' ? 'bg-p200' : 'bg-b50'}`}>
                                                    <CarModeIcon className={`w-5 h-5  ${activeMode === 'driving' ? 'text-p50' : 'text-b200'}`} />
                                                </StyledView>
                                            </Pressable>
                                            <Pressable onPress={() => setActiveMode('walking')}>
                                                <StyledView className={`w-10 rounded-full h-10 flex items-center justify-center ${activeMode === 'walking' ? 'bg-p200' : 'bg-b50'}`}>
                                                    <WalkingModeIcon className={`w-5 h-5  ${activeMode === 'walking' ? 'text-p50' : 'text-b200'}`} />
                                                </StyledView>
                                            </Pressable>
                                        </StyledView>
                                        <StyledText className="text-b300 text-lg font-semibold">
                                            {duration} {durationUnit} | {distance} {distanceUnit}
                                        </StyledText>
                                    </StyledView>
                                </StyledView>
                                <StyledView className={`flex flex-col  px-8 py-[10px] gap-y-3`}>
                                    <Pressable onPress={() => setShowRouteDetails(!showRouteDetails)}>
                                        <StyledView className="flex flex-row justify-between items-center my-4">
                                            <StyledText className="font-semibold text-b200 text-sm">
                                                {!showRouteDetails ? 'Show route details' : 'Hide route details'}
                                            </StyledText>
                                            <StyledView>
                                                <ArrowIcon className={`w-4 h-4 text-b300 ${showRouteDetails ? 'rotate-180' : ''}`} />
                                            </StyledView>
                                        </StyledView>
                                    </Pressable>
                                    {
                                        showRouteDetails && routeDetails.map((route, id) =>
                                            <StyledView key={`step-${id}`} className="flex flex-row items-center gap-x-2">
                                                <StyledView className="flex flex-col gap-y-1  w-full">
                                                    <StyledView>
                                                        <StyledText className="text-b400 font-semibold text-sm">{route.maneuver.instruction}</StyledText>
                                                    </StyledView>
                                                    <StyledView className="flex flex-row justify-between items-center">
                                                        <StyledView className="flex flex-row items-center gap-x-1">
                                                            <StyledText className="text-b100 text-xs">
                                                                in
                                                            </StyledText>
                                                            <StyledText className="text-b100 text-xs font-semibold">
                                                                {metersToKM(route.distance).distance}{metersToKM(route.distance).unit}
                                                            </StyledText>
                                                        </StyledView>
                                                        <StyledView className="flex flex-row items-center gap-x-1">
                                                            <DurationIcon className="text-b100 w-3 h-3" />
                                                            <StyledText className="text-b100 text-xs font-semibold">
                                                                {secondsToMinutesAndHour(route.duration).time} {secondsToMinutesAndHour(route.duration).unit}
                                                            </StyledText>
                                                        </StyledView>
                                                    </StyledView>
                                                </StyledView>
                                            </StyledView>)
                                    }
                                </StyledView>
                                <StyledView className={`flex flex-row items-end justify-evenly  px-4 py-6 border-t border-b50 `}>
                                    <Pressable onPress={handleRouteShare}>
                                        <StyledView className="py-3 px-6 bg-[#EFEEF3] flex flex-row items-center gap-x-2 rounded-3xl">
                                            <ShareIcon className="w-5 h-5 text-b200" />
                                            <StyledText className="text-[16px] font-[500] text-b200">Share</StyledText>
                                        </StyledView>
                                    </Pressable>
                                    <Pressable>
                                        <StyledView className="py-3 px-8 bg-p300 rounded-3xl flex flex-row items-center gap-x-2">
                                            <StartNavigationIcon className="w-5 h-5" />
                                            <StyledText className="text-[16px] text-white">Start</StyledText>
                                        </StyledView>
                                    </Pressable>
                                </StyledView>
                            </StyledView>
                    }
                </StyledView>
            </MapComponent>
        </SafeAreaView >
    );
}


