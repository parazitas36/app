import React from 'react'
import { View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Button from '../components/Button';
import MapCard from '../components/MapCard';

const Maps = () => {
    const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const changeRegion = (region) => {
        const reg = { region }
        setRegion(reg[['region']]);
    }
    return (
        <View>
            <MapView
                style={{
                    height: '80%',
                }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onRegionChange={changeRegion}
            >
                <Marker
                    pinColor='red'
                    coordinate={region}
                >
                    <Callout tooltip={true}
                    >
                        <MapCard />
                    </Callout>
                </Marker>
            </MapView>
            <Button title="Pick" 
            styles={{btn: {}, btntxt: {}}}
            onPress={() => console.log(region)}/>
        </View>
    )
}

export default Maps