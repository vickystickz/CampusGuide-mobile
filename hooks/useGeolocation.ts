import { useCallback, useEffect } from "react";
import * as Location from 'expo-location';
import { Linking, Platform, } from "react-native";
import { useModal } from "./useModal";
import { useMapContext } from "@/context/MapContext";
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';

export const useGeolocation = () => {

    // Incase they select, 'use current location' or presses the geolocation icon , 
    // use this to check if they have enabled their current
    // location, otherwise show the appropriate modal.

    useEffect(() => {
        // Open the enable location permission by default when the page opens
        (async () => {
            await Location.requestForegroundPermissionsAsync();
        })();

        // If the user is coming back from the settings page
        // And if they've enabled the permission, then close the modal
        (async () => {
            const status = await Location.getForegroundPermissionsAsync()
            if (status?.granted) {
                setModalVisible(false)
            }
        })();
    }, []);

    const goToSettings = async () => {
        if (Platform.OS == 'ios') {
            // Linking for iOS
            Linking.openURL('app-settings:');
        } else {
            // Open location settings
            await startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
        }
    };
    const { modalVisible, setModalVisible } = useModal();
    const { setUserCurrentLocation, } = useMapContext()
    const handleGeolocation = useCallback(async () => {
        const status = await Location.getForegroundPermissionsAsync()
        if (!status?.granted) {
            // Open the modal that will take the users to settings
            // because by default location permission opens when the application opens for the first time
            // so if the status is not granted yet, then it means the user denied the permission
            // so we need to direct them to settings to enable location for Campus Guide.
            setModalVisible(true)
            //open the device settings
            return;
        } else {
            // get the location
            const currentPosition = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
                mayShowUserSettingsDialog: true,

            })
            // set it in context to move the map to the location.
            setUserCurrentLocation(
                {
                    latitude: currentPosition.coords.latitude,
                    longitude: currentPosition.coords.longitude
                }
            )
        }
    }, [])

    return { goToSettings, handleGeolocation, modalVisible, setModalVisible }
}