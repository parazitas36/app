import React from 'react'
import { View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { ReverseGeocoding } from '../api/ReverseGeocoding';
import Button from '../components/Button';
import MapCard from '../components/MapCard';
import { Searchbar } from 'react-native-paper';
import { FindCityByName } from '../api/FindCityByName';

const Maps = ({navigation, route}) => {
    const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const {lct, setCity} = route.params;
    const [ location, setLocation ] = lct;
    const [findCity, setFindCity] = React.useState(null);

    const changeRegion = (region) => {
        const reg = { region }
        console.log(reg[['region']])
        setRegion(reg[['region']]);
    }

    const redirectToCity = async() => {
        const result = await FindCityByName(findCity)
        setRegion({"latitude": Number(result[1]), "longitude": Number(result[0]),
         "latitudeDelta": 0.0922,"longitudeDelta": 0.0421,})
    }

    return (
        <View>
            <Searchbar 
                placeholder='Search'
                defaultValue=''
                value={findCity}
                onChangeText={setFindCity}
                onIconPress={redirectToCity}
            />
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
                region={region}
                onRegionChangeComplete={changeRegion}
            >
                <Marker
                    pinColor='red'
                    coordinate={region}
                    draggable
                    onDragEnd={(e)=>setRegion({...e.nativeEvent.coordinate, "latitudeDelta": 0.0922,"longitudeDelta": 0.0421,})}
                    title="Choose location"
                >
                </Marker>
            </MapView>
            <Button title="Pick" 
            styles={{
                btn: {
                    borderColor: 'black',
                    borderWidth: 1,
                    width: 100,
                    height: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    marginTop: 15
                }, 
                btntxt: {
                    color: 'black',
                    fontSize: 20,
                    fontWeight: '500'
                }
            }}
            onPress={() => { ReverseGeocoding(region['longitude'], region['latitude'], setCity); setLocation(region); navigation.navigate('CreateGuide');}}/>
        </View>
    )
}

export default Maps