import { Dimensions, StyleSheet, Image, Text, View, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import Button from '../components/Button';
import IOnicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UnsaveGuide } from '../api/UnsaveGuide';
import { SaveGuide } from '../api/SaveGuide';
import { Context } from '../App';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const defaultImageURI = "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F02%2Feiffel-tower-paris-france-EIFFEL0217.jpg&q=60";

const Card = (props) => {
    const { accInfo } = useContext(Context);
    const [userInfo, setUserInfo] = accInfo;
    const [favorite, setFavorite] = useState(null);
    const [uri, setUri] = useState(null);
    const [owned, setOwned] = useState(Math.max(props.payedguides.includes(props.guideID), props.price === 0, props.creatorID === props.userID) === 1)

    if (favorite === null) {
        setFavorite(props.favorite);
    }
    if(uri === null){
        setUri(props.uri)
    }

    const onClick = () => {
        if(owned){
            props.setChosenGuideID(props.guideID);
            props.navigation.navigate("Guide")
        }else{
            props.navigation.navigate("Payments", {
                guideID : props.guideID,
                price : props.price,
                title: props.title
            });
        }
    }

    return (
        <View style={styles.view}>
            <Image blurRadius={1} style={styles.image} source={{ uri: !props.uri ? defaultImageURI : uri }} />
            <View style={styles.imageOpacity} />

            <View style={styles.guideButtons}>
                <TouchableOpacity >
                    <Pressable onPress={async () => {
                        let resp = null;
                        if (favorite === true) {
                            resp = await UnsaveGuide(props.guideID, props.userID);
                            if (resp.status === 200) {
                                for (let i = 0; i < props.savedguides.length; i++) {
                                    if (props.savedguides[i] === props.guideID) {
                                        if (i !== props.savedguides.length - 1) {
                                            for (let j = i; j < props.savedguides.length - 1; j++) {
                                                props.savedguides[j] = props.savedguides[j + 1]
                                            }
                                        }
                                        props.savedguides.pop();
                                        break;
                                    }
                                }
                                const json = await resp.json();
                                setUserInfo(json);
                                setFavorite(false)
                            }
                        } else if (favorite === false) {
                            resp = await SaveGuide(props.guideID, props.userID);
                            if (resp.status === 200) {
                                props.savedguides.push(props.guideID);
                                const json = await resp.json();
                                setUserInfo(json);
                                setFavorite(true)
                            }
                        }
                    }
                    }>
                        <IOnicons name={!favorite ? 'heart-outline' : 'heart'} size={30} color={favorite ? "#ff1e5a" : 'white'} />
                    </Pressable>
                </TouchableOpacity>
            </View>

            <View style={[styles.guideButtons, { top: 95, flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                <IOnicons name='location-outline' color="white" size={30} />
                <Text style={styles.city}>{props.city ? props.city : "City"}</Text>
            </View>

            <View style={[styles.guideButtons, { top: 165 - 35, flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                <Text style={styles.rating}>Rating: {props.rating ? props.rating : '-'}/5</Text>
                <IOnicons name={'star'} size={25} color={'gold'} />
            </View>


            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>{props.title ? props.title : 'Pavadinimas'}</Text>

            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.creator}>{props.creator ? props.creator : 'by Username'}</Text>

            <Text style={styles.text}
            numberOfLines={7}
            ellipsizeMode={'tail'}
            >
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
                        onPress={onClick}
                    >
                        <FontAwesome5 style={{marginBottom: -8}} name='chevron-down' size={22} color={'rgba(255, 255, 255, 0.8)'} />
                        <Text style={styles.btntxt}>{owned ? "Show all" : `Buy for ${(props.price).toFixed(2)} €`}</Text>
                    </Pressable>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Card

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
        color: 'rgba(255, 255, 255, 0.8)',
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
        backgroundColor: 'rgba( 93, 122, 152, 0.85 )',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
        height: 45,
        bottom: 0,
    },
    imageOpacity: {
        height: 165,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: '100%',
        position: 'absolute',
        top: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    }
})