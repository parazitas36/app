import { Dimensions, StyleSheet, Image, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button';
import IOnicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Card = () => {
    const [favorite, setFavorite] = useState(false);
    return (
        <View style={styles.view}>
            <Image
                style={styles.image}
                source={{ uri: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F02%2Feiffel-tower-paris-france-EIFFEL0217.jpg&q=60" }}
            />
            <View style={{
                height: height * .225,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                width: '100%',
                position: 'absolute',
                top: 0,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
            }} />

            <View style={styles.guideButtons}>
                <TouchableOpacity >
                    <Pressable onPress={() => setFavorite(!favorite)}>
                        <IOnicons name={!favorite ? 'heart-outline' : 'heart'} size={30} color={favorite ? "#ff1e5a" : 'white'} />
                    </Pressable>
                </TouchableOpacity>
            </View>

            <View style={[styles.guideButtons, { top: height * .225 - 35, flex: 1, flexDirection: 'row'}]}>
                <TouchableOpacity>
                    <Pressable style={{
                         flex: 1, 
                         flexDirection: 'row',
                         justifyContent: 'center',
                         alignItems: 'center',
                         }} onPress={() => setFavorite(!favorite)}>
                        <Text style={{fontSize: 16, color: 'white', marginRight: 8, fontWeight: '500'}}>Rating: 3.4/5</Text>
                        <IOnicons name={'star'} size={25} color={'gold'} />
                    </Pressable>
                </TouchableOpacity>
            </View>


            <Text style={[styles.title, {
                borderBottomColor: 'black', borderBottomWidth: 1, width: '80%', alignSelf: 'center', textAlign: 'center'
            }]
            }>Pavadinimas</Text>

            <Text style={styles.text}>
                Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...
                Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...
                Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...
                Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...
            </Text>

            <View style={
                styles.btn, {
                    alignContent: 'center',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    paddingVertical: 5,
                    backgroundColor: '#1f428d',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    position: 'absolute',
                    bottom: 0,
                    shadowColor: '#1f428d',
                    shadowOpacity: 0.5,
                    shadowOffset: { width: 0, height: -10 },
                    shadowRadius: 10,
                    elevation: 15,
                }
            }>
                <TouchableOpacity>
                    <Pressable style={{
                        alignContent: 'center',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        flexDirection: 'row'
                    }}>
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
        shadowOffset: { width: 20, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 10,
    },
    image: {
        width: '100%',
        height: height * .225,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: 'rgba(0, 0, 0, 0.45)',
        borderWidth: 2,
    },
    title: {
        fontSize: 28,
        fontWeight: '500',
        color: 'black',
        margin: 5,
        textShadowColor: 'black',
        textShadowRadius: 3,
    },
    text: {
        fontSize: 14,
        paddingHorizontal: 20,
        marginTop: 5,
        paddingBottom: 5,
        color: 'black',
        height: height * .15,
        overflow: 'hidden',
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
    }
})