import React from 'react'
import {
    PermissionsAndroid,
    ToastAndroid
} from 'react-native'

import Geolocation from '@react-native-community/geolocation';

export const CurrentLocation = async (states) => {
    const [coords, setCoords] = states
    const RequestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Access Required",
                    message: "This App needs to Access your location"
                }
            );
            console.log("Granted:", granted)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                GetOneTimeLocation();
            }
        } catch (e) {
            ToastAndroid.show(
                "Could not access your location.",
                ToastAndroid.SHORT
            )
            console.log(e)
        }
    }
    const GetOneTimeLocation = () => {
        Geolocation.getCurrentPosition((position) => {
            setCoords(position.coords)
        },
            (error) => {
                ToastAndroid.show(
                    "Could not access your location.",
                    ToastAndroid.SHORT
                )
                console.log(error)
                setCoords(null);
            },
            {
                enableHighAccuracy: false,
                maximumAge: 10000,
                timeout: 30000
            })
    };

    await RequestLocationPermission();
}