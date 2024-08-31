import React, { useEffect, useMemo, useRef } from "react";
import Mapbox, { Camera, CircleLayer, MapView, UserLocation, ShapeSource, LineLayer, PointAnnotation, FillLayer } from "@rnmapbox/maps";
import { StyledView } from "./StyledView";
import { useMapContext } from "@/context/MapContext";
import * as turf from '@turf/bbox'
import SchoolIcon from "./icons/SchoolIcon";
import LocationCircleIcon from "./LocationCircleIcon";


const mapboxAccessToken = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

Mapbox.setAccessToken(mapboxAccessToken);


const locationMarkerStyles = {
    background: {
        circleRadius: 14,
        circleColor: '#fff',
        circlePitchAlignment: 'map',
    },
    foreground: {
        circleRadius: 8,
        circleColor: '#992BF4',
        circlePitchAlignment: 'map',
    },
};


const MapComponent = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // https://www.mapbox.com/telemetry
        Mapbox.setTelemetryEnabled(false);
    }, [])

    const { basemapStyle, setCurrentRoute, userCurrentLocation, selectedCampus, currentRoute, routeOrigin, routeDestination } = useMapContext()

    const cameraRef = useRef(null)

    //Update the location when the user clicks on the Geolocation icon
    useEffect(() => {
        if (!userCurrentLocation.latitude && !userCurrentLocation.longitude) return
        cameraRef.current?.setCamera({
            centerCoordinate: [
                userCurrentLocation.longitude,
                userCurrentLocation.latitude
            ],
            zoomLevel: 18,
            animationDuration: 3000,
            animationMode: 'flyTo'
        }
        )
    }, [userCurrentLocation])

    useEffect(() => {
        if (!selectedCampus) return

        // Get the bbox
        const bbox = turf.bbox(selectedCampus.layer)

        // Fit the bounds
        cameraRef.current?.fitBounds(
            [bbox[2], bbox[3]],
            [bbox[0], bbox[1]],
            [2, 10, 300, 10],
            3000,
        )
    }, [selectedCampus])


    useEffect(() => {
        if (!currentRoute) return
        // Get the bbox
        const bbox = turf.bbox(currentRoute)

        // Fit the bounds
        cameraRef.current?.fitBounds(
            [bbox[2], bbox[3]],
            [bbox[0], bbox[1]],
            [2, 10, 300, 10],
            3000,
        )
    }, [currentRoute])

    const showUserLocation = useMemo(() => (userCurrentLocation.latitude && userCurrentLocation.longitude),
        [userCurrentLocation.longitude, userCurrentLocation.latitude]);

    // Default to Nigeria
    const defaultCamera = {
        centerCoordinate: [7.54382, 5.446947],
        zoomLevel: 5,
        minZoomLevel: 3,
    };
    return (

        <StyledView className="relative">
            <MapView
                scaleBarEnabled={false}
                style={{ width: '100%', height: '100%' }}
                styleURL={basemapStyle.styleURL}
                logoEnabled={false}
            >
                <Camera ref={cameraRef} defaultSettings={defaultCamera} />
                {/* Show user location icon */}
                {showUserLocation &&
                    <UserLocation>
                        <CircleLayer
                            key="mapboxUserLocationWhiteCircle"
                            id="mapboxUserLocationWhiteCircle"
                            style={locationMarkerStyles.background}
                        />
                        <CircleLayer
                            key="mapboxUserLocationBlueCircle"
                            id="mapboxUserLocationBlueCircle"
                            aboveLayerID="mapboxUserLocationWhiteCircle"
                            style={locationMarkerStyles.foreground}
                        />
                    </UserLocation>
                }
                {/* Show campuse boundary */}
                {
                    selectedCampus &&
                    <>
                        {/* Show campus marker */}
                        <PointAnnotation
                            id={"campusAnnotation"}
                            coordinate={[selectedCampus.longitude, selectedCampus.latitude]}
                        >
                            <StyledView className="flex flex-col items-center justify-center rounded-full">

                                <StyledView className="p-1 bg-white rounded-full">
                                    <StyledView
                                        className="flex items-center justify-center w-10 h-10 bg-p50 rounded-full"
                                    >
                                        <SchoolIcon className="w-6 h-6 text-p500" />
                                    </StyledView>
                                </StyledView>
                                <StyledView
                                    className="w-2 h-3 rounded-b-3xl bg-white"
                                >
                                </StyledView>
                            </StyledView>
                        </PointAnnotation>
                        {/* Show campus boundary */}
                        <ShapeSource id="campuseBoundarySource" shape={selectedCampus.layer}>
                            <LineLayer id="campusBoundaryLineLayer"
                                existing
                                style={{
                                    // Incase the user switch to satellite, Purple was not showing well on the map
                                    // so white is is better.
                                    lineColor: `${basemapStyle.name === 'Satellite' ? '#fff' : '#510094'}`,
                                    lineWidth: 3,
                                    lineDasharray: [2, 2]
                                }} />
                            <FillLayer id="campusBoundaryFillLayer"
                                existing
                                style={{
                                    // Incase the user switch to satellite, Purple was not showing well on the map
                                    // so white is is better.
                                    fillColor: `${basemapStyle.name === 'Satellite' ? '#fff' : '#F3E6FE'}`,
                                    fillOpacity: 0.2
                                }} />
                        </ShapeSource>
                    </>
                }


                {/* Show origin and destination */}

                {
                    routeOrigin.latitude && routeOrigin.longitude ? <PointAnnotation
                        id={"routeOriginAnnotation"}
                        coordinate={[routeOrigin.longitude, routeOrigin.latitude]}
                    >
                        <StyledView className="flex flex-col items-center justify-center rounded-full">
                            <StyledView className="bg-p200 shadow-2xl shadow-black p-2 w-6 rounded-full h-6 flex items-center justify-center">
                                <StyledView className={`w-3 bg-white rounded-full h-3 `} />
                            </StyledView>
                            <StyledView
                                className="w-1 h-3 rounded-b-3xl bg-white"
                            >
                            </StyledView>
                        </StyledView>
                    </PointAnnotation> : null
                }
                {
                    routeDestination.latitude && routeDestination.longitude ? <PointAnnotation
                        id={"routeDestinationAnnotation"}
                        coordinate={[routeDestination.longitude, routeDestination.latitude]}
                    >
                        <StyledView className="flex flex-col items-center justify-center rounded-full">
                            <StyledView className="bg-[#FF4A4A] shadow-2xl shadow-black p-2 w-6 rounded-full h-6 flex items-center justify-center">
                                <StyledView className={`w-3 bg-white rounded-full h-3 `} />
                            </StyledView>
                            <StyledView
                                className="w-1 h-3 rounded-b-3xl bg-white"
                            >
                            </StyledView>
                        </StyledView>
                    </PointAnnotation> : null
                }
                {/* Show route line */}

                {
                    currentRoute &&
                    <ShapeSource id="currentRouteLineSource" shape={currentRoute}>
                        <LineLayer id="currentRouteLineLayer"
                            existing
                            style={{
                                // Incase the user switch to satellite, Purple was not showing well on the map
                                // so white is is better.
                                lineColor: `${basemapStyle.name === 'Satellite' ? '#fff' : '#510094'}`,
                                lineWidth: 3,
                            }} />
                    </ShapeSource>
                }
            </MapView>
            {children}
        </StyledView>
    );

}

export default MapComponent