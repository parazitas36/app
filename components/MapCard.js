import { Dimensions, StyleSheet, Image, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Button from './Button';
import IOnicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UnsaveGuide } from '../api/UnsaveGuide';
import { SaveGuide } from '../api/SaveGuide';
import WebView from 'react-native-webview';
import { Svg, Image as ImageSvg } from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import { Marker, Callout } from 'react-native-maps';

const defaultImageURI = "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F02%2Feiffel-tower-paris-france-EIFFEL0217.jpg&q=60";

const MapCard = (props) => {
    const [trackView, setTrackViewChanges] = React.useState(true)
    const [show, setShow] = React.useState(false);
    return (
        <Marker
            pinColor='red'
            coordinate={{ latitude: props.item['latitude'], longitude: props.item['longtitude'] }}
            tracksViewChanges={trackView}
            onPress={() => {if(!show) {setShow(true); return;} props.setChosenGuideID(props.item["_id"], props.navigation.navigate("Guide"))}}
        >

                {show && 
                <View style={styles.wrapper}>
                    <View style={styles.view}>
                        <Svg style={styles.image}>
                            <FastImage
                                style={{ width: '100%', aspectRatio: 1 }}
                                source={{ uri: props.image_uri ? props.image_uri : defaultImageURI, priority: FastImage.priority.high }}
                                resizeMode={FastImage.resizeMode.cover}
                                onLoadEnd={() => setTrackViewChanges(false)}
                            />
                        </Svg>
                        <View style={styles.overflow} />
                    </View>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>{props.title ? props.title : Pavadinimas}</Text>
                    <View style={styles.ratingview}>
                        <Text style={styles.rating}>{props.rating ? props.rating : '-'}/5</Text>
                        <IOnicons name={'star-outline'} size={24} color={'rgb(255, 255, 255)'} />
                    </View>
                    <View style={styles.arrow} />
                </View>}
         
        </Marker>
    )
}

export default MapCard

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        height: 136,
        width: 200,
        maxWidth: 200,
        borderRadius: 5,
        backgroundColor: 'transparent',
        borderColor: 'transparent'
    },
    view: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 200,
        height: 120,
        borderRadius: 5,
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    image: {
        width: '105%',
        height: '105%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 5,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 16,
        position: 'relative',
        bottom: 0,
        marginTop: -0.4,
    },
    title: {
        position: 'absolute',
        top: 10,
        color: 'white',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: {
            height: -2,
            width: 2,
        },
        textShadowRadius: 15,
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 2,
    },
    overflow: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
    ratingview: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'flex-end',
        right: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rating: {
        fontSize: 16,
        marginRight: 5,
        fontWeight: '500',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: {
            height: -2,
            width: 2,
        },
        textShadowRadius: 15,
    }
})