import { Dimensions, StyleSheet, Image, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button';
import IOnicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SetInvisible } from '../api/SetInvisible';
import { SetVisible } from '../api/SetVisible';

export const MyCardContext = React.createContext();


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const defaultImageURI = "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F02%2Feiffel-tower-paris-france-EIFFEL0217.jpg&q=60";

const MyCard = (props) => {
    const [visible, setVisible2] = useState(null);
    const [uri, setUri] = useState(null);
    const [guideId, setGuideId] = React.useState('62849e68fd614b3e9b5e2d0a')
    
    if (visible === null) {
        setVisible2(props.visible);
    }
    if(uri === null){
        setUri(props.uri)
    }
    if(guideId === null){
        setGuideId(props.guideID)
    }

    return (
        <MyCardContext.Provider value={guideId}>
            <View style={styles.view}>
                <Image blurRadius={1} style={styles.image} source={{ uri: !props.uri ? defaultImageURI : uri }} />
                <View style={styles.imageOpacity} />

                <View style={styles.guideButtons}>
                    <TouchableOpacity >
                        <Pressable onPress={async () => {
                            let resp = null;
                            if (visible === true) {
                                resp = await SetInvisible(props.guideID);
                                if (resp.status === 200) {
                                    setVisible2(false)
                                }
                            } else if (visible === false) {
                                resp = await SetVisible(props.guideID);
                                if (resp.status === 200) {
                                    setVisible2(true)
                                }
                            }
                        }
                        }>
                            <IOnicons name={visible ? 'eye' : 'eye-off'} size={30} color={'white'} />
                        </Pressable>
                    </TouchableOpacity>
                </View>
                <View style={[styles.guideButtons, { top: 55, flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                    <TouchableOpacity>
                        <Pressable onPress={props.navigateToEdit}>
                            <FontAwesome5  name='edit' size={30} color={'white'} />
                        </Pressable>
                    </TouchableOpacity>
                </View>

                <View style={[styles.guideButtons, { top: 95, flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                    <IOnicons name='location-outline' color="white" size={30} />
                    <Text style={styles.city}>{props.city ? props.city : "City"}</Text>
                </View>

                <View style={[styles.guideButtons, { top: 165 - 35, flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={styles.rating}>Rating: {props.rating ? props.rating : '-'}/5</Text>
                    <IOnicons name={'star-outline'} size={24} color={'rgb(255, 255, 255)'} />
                </View>


                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>{props.title ? props.title : 'Pavadinimas'}</Text>

                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.creator}>{props.creator ? props.creator : 'by Username'}</Text>

                <Text style={styles.text}>
                    {props.description}
                </Text>

                <View style={
                    styles.readMore
                }>
                    <TouchableOpacity>
                        <Pressable style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                            onPress={props.onClick}
                        >
                            <FontAwesome5 style={{marginBottom: -8}} name='chevron-down' size={22} color={'rgba(255, 255, 255, 0.85)'} />
                            <Text style={styles.btntxt}>Show all</Text>
                        </Pressable>
                    </TouchableOpacity>
                </View>
            </View>
        </MyCardContext.Provider>
    )
}

export default MyCard

const styles = StyleSheet.create({
    view: {
        width: width * .9,
        margin: 10,
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'rgba(229, 229, 229, 0.5)',
    },
    image: {
        width: '100%',
        height: 165,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 2,
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: '500',
        position: 'absolute',
        top: 10,
        left: 10,
        width: '70%',
        height: 150,
        overflow: 'hidden',
        textShadowColor: 'black',
        textShadowRadius: 15,
        textShadowOffset: { height: -2, width: 2 },
        paddingHorizontal: 5,
    },
    text: {
        paddingTop: 10,
        fontSize: 15,
        marginTop: 5,
        paddingBottom: 5,
        width: '90%',
        color: 'black',
        height: 150,
        overflow: 'hidden',
        paddingHorizontal: 20,
        fontWeight: '400',
        textAlign: 'justify',
    },
    btn: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btntxt: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.85)',
        fontWeight: '500',
        marginBottom: 5
    },
    guideButtons: {
        position: 'absolute',
        top: 10,
        right: 15,
    },
    creator: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        position: 'absolute',
        top: 165 - 25,
        left: 15,
        width: '50%',
        height: '10%',
        overflow: 'hidden',
        textShadowColor: 'black',
        textShadowRadius: 15,
        textShadowOffset: { height: -2, width: 2 }
    },
    rating: {
        fontSize: 16,
        color: 'white',
        marginRight: 8,
        fontWeight: '500',
        textShadowColor: 'black',
        textShadowRadius: 15,
        textShadowOffset: { height: -2, width: 2 }
    },
    city: {
        fontSize: 16,
        color: 'white',
        marginLeft: 3,
        marginRight: 3,
        fontWeight: '500',
        textShadowColor: 'black',
        textShadowRadius: 15,
        textShadowOffset: { height: -2, width: 2 }
    },
    readMore: {
        alignContent: 'center',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 5,
        backgroundColor: 'rgba(95, 119, 147, 0.9)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
        height: 45,
        bottom: 0,
    },
    imageOpacity: {
        height: 165,
        backgroundColor: 'rgba(0, 0, 0, 0.175)',
        width: '100%',
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    }
})