import React from 'react'
import { View, ImageBackground, Pressable } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { ActivityIndicator } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { CurrentLocation } from '../api/CurrentLocation';
import { FindCityByName } from '../api/FindCityByName';
import { GetAllGuides } from '../api/GetAllGuides';
import { Context } from '../App';
import Button from '../components/Button';
import MapCard from '../components/MapCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const image = require('../assets/images/background.png');

const SearchMaps = ({ navigation }) => {
    const { guideID } = React.useContext(Context);
    const [chosenGuideID, setChosenGuideID] = guideID;
    const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [coords, setCoords] = React.useState(null)
    const [findCity, setFindCity] = React.useState(null);

    const [guides, setGuides] = React.useState(null);

    React.useLayoutEffect(() => {
        (async () => {
            const resp = await GetAllGuides();
            setGuides(resp);
        })()
    }, []);

    const changeRegion = (region) => {
        const reg = { region }
        setRegion(reg[['region']]);
    }

    const redirectToCity = async () => {
        const result = await FindCityByName(findCity)
        setRegion({
            latitude: Number(result[1]), longitude: Number(result[0]),
            latitudeDelta: 0.0922, longitudeDelta: 0.0421,
        })
    }

    if (!guides) {
        <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
            <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center', marginTop: 50 }} />
        </ImageBackground>
    }

    if (coords && region.latitude != coords['latitude'] && region.longitude != coords['longitude']) {
        setRegion({
            latitude: coords['latitude'],
            longitude: coords['longitude'],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }

    return (
        <View>
            <Searchbar
                placeholder='Search'
                defaultValue=''
                value={findCity}
                onChangeText={setFindCity}
                onIconPress={redirectToCity}
                onKeyPress={redirectToCity}
                onEndEditing={redirectToCity}
            />
            <Pressable style={{
                width: 50,
                height: 50,
                position: 'absolute',
                bottom: 150,
                right: 10,
                borderRadius: 45,
                zIndex: 9999,
                backgroundColor: 'rgba(255, 255, 255, .75)',
                justifyContent: 'center',
                alignItems: 'center'
            }}
                onPress={async () => { await CurrentLocation([coords, setCoords]); console.log(coords) }}
            >
                <MaterialIcons name="my-location" size={36} color="rgba(0, 0, 0, .75)"/>
            </Pressable>

            <MapView
                style={{
                    height: '100%',
                }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                region={region}
            >
                {guides && guides.length > 0 &&
                    guides.map((item) => {
                        if (item && item['price'] === 0) {
                            return (
                                <MapCard
                                    rating={item['rating']}
                                    title={item['title']}
                                    image_uri={item['image']}
                                    item={item}
                                    setChosenGuideID={setChosenGuideID}
                                    navigation={navigation}
                                />
                            )
                        }
                    })
                }

            </MapView>
        </View>
    )
}

export default SearchMaps