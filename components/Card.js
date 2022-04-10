import { Dimensions, StyleSheet, Image, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button';
import IOnicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const defaultImageURI = "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F02%2Feiffel-tower-paris-france-EIFFEL0217.jpg&q=60";

const Card = (props) => {
    const [favorite, setFavorite] = useState(false);
    return (
        <View style={styles.view}>
            <Image style={styles.image} source={{ uri: !props.uri ? defaultImageURI : props.uri }} />
            <View style={styles.imageOpacity} />

            <View style={styles.guideButtons}>
                <TouchableOpacity >
                    <Pressable onPress={() => setFavorite(!favorite)}>
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


            <Text numberOfLines={2} ellipsizeMode='tail'  style={styles.title}>{props.title ? props.title : 'Pavadinimas'}</Text>

            <Text numberOfLines={1} ellipsizeMode='tail'  style={styles.creator}>{props.creator ? props.creator : 'by Username'}</Text>

            <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Varius duis at consectetur lorem donec massa sapien. Egestas purus viverra accumsan in nisl nisi scelerisque eu. 
                Eget arcu dictum varius duis. Sodales neque sodales ut etiam sit amet nisl purus. 
                Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. 
                Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. 
                Facilisi morbi tempus iaculis urna id. Consequat nisl vel pretium lectus quam. 
                Massa tempor nec feugiat nisl pretium fusce. Sit amet risus nullam eget felis eget. 
                Nunc sed blandit libero volutpat sed cras ornare arcu. Odio ut enim blandit volutpat.
                Congue mauris rhoncus aenean vel. Nunc sed augue lacus viverra vitae congue eu. 
                Semper viverra nam libero justo laoreet sit amet cursus. Risus quis varius quam quisque id diam. 
                Sed turpis tincidunt id aliquet risus feugiat in ante. Non enim praesent elementum facilisis leo vel fringilla est.
            </Text>

            <View style={
                styles.btn, styles.readMore
            }>
                <TouchableOpacity>
                    <Pressable style={{
                        alignContent: 'center',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row',
                    }}
                    onPress={props.onClick}
                    >
                        <Text style={styles.btntxt}>READ MORE</Text>
                        <Feather name='chevrons-down' size={30} color={'rgba(255, 255, 255, 0.9)'} />
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
        backgroundColor: 'white',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#FFFAFA',
    },
    image: {
        width: '100%',
        height: 165,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: 'rgba(0, 0, 0, 0.45)',
        borderWidth: 2,
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: '500',
        position: 'absolute',
        top: 10,
        left: 15,
        width: '70%',
        height: '20%',
        overflow: 'hidden',
        textShadowColor: 'black',
        textShadowRadius: 15,
        textShadowOffset: { height: -2, width: 2 },
        paddingHorizontal: 2,
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
        textAlign: 'justify'
    },
    btn: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btntxt: {
        fontSize: 22,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
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
        textShadowOffset: { height: -2, width: -3 }
    },
    rating: {
        fontSize: 16,
        color: 'white',
        marginRight: 8,
        fontWeight: '500',
        textShadowColor: 'black',
        textShadowRadius: 15,
        textShadowOffset: { height: -2, width: -3 }
    },
    city: {
        fontSize: 16,
        color: 'white',
        marginLeft: 3,
        marginRight: 3,
        fontWeight: '500',
        textShadowColor: 'black',
        textShadowRadius: 15,
        textShadowOffset: { height: -2, width: -3 }
    },
    readMore: {
        alignContent: 'center',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: 'rgba(31, 66, 141, 0.925)',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
        bottom: 0,
        shadowColor: '#1f428d',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: -10 },
        shadowRadius: 10,
        elevation: 15,
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