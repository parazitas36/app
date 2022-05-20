import React from 'react'
import { View, ImageBackground } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { ActivityIndicator } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import { FindCityByName } from '../api/FindCityByName';
import { GetAllGuides } from '../api/GetAllGuides';
import Button from '../components/Button';
import MapCard from '../components/MapCard';

const image = require('../assets/images/background.png');

const SearchMaps = () => {
    const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [findCity, setFindCity] = React.useState(null);

    const [guides, setGuides] = React.useState(null);

    React.useLayoutEffect(() => {
        (async() => {
            const resp = await GetAllGuides();
            setGuides(resp);
        })()
    }, []);

    const changeRegion = (region) => {
        const reg = { region }
        setRegion(reg[['region']]);
    }

    const redirectToCity = async() => {
        const result = await FindCityByName(findCity)
        setRegion({latitude: Number(result[1]), longitude: Number(result[0]),
         latitudeDelta: 0.0922,longitudeDelta: 0.0421,})
    }

    if(!guides){
        <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center', marginTop: 50 }} />
        </ImageBackground>
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
                        if (item) {
                            return <Marker
                                pinColor='red'
                                coordinate={{latitude : item['latitude'], longitude: item['longtitude']}}
                            >
                                <Callout tooltip={true}
                                >
                                    <MapCard 
                                    rating={item['rating']}
                                    title={item['title']} 
                                    image_uri={item['image']}
                                    />
                                </Callout>
                            </Marker>
                        }
                    })
                }
                
            </MapView>
        </View>
    )
}

export default SearchMaps