import React, { Component, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Mapbox, { MapView } from "@rnmapbox/maps";
import { StyledView } from "./StyledView";

Mapbox.setAccessToken("pk.eyJ1Ijoidmlja3lzdGlja3oiLCJhIjoiY2xmYXh0OHVlMG4wcDNxbmdtbjgwOGp3YyJ9.fMGn7GNnSZKs6BCvvKeaNw");



const MapComponent = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // https://www.mapbox.com/telemetry
        Mapbox.setTelemetryEnabled(false);
    }, [])


    return (
        <StyledView>
            <MapView scaleBarEnabled={false} style={{ width: '100%', height: '100%' }} styleURL="mapbox://styles/mapbox/streets-v11" />
            {children}
        </StyledView>
    );

}

export default MapComponent