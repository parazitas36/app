import { Dimensions, StyleSheet, Image, Text, View } from 'react-native'
import React from 'react'
import Button from '../components/Button';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Card = () => {
    return (
        <View style={styles.view}>
            <Image
                style={styles.image}
                source={{ uri: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2017%2F02%2Feiffel-tower-paris-france-EIFFEL0217.jpg&q=60" }}
            />
            <Text style={styles.title}>Pavadinimas</Text>
            <Text style={styles.text}>
                Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...
                Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...
                Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...
                Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...Tekstas...
            </Text>
            <Button title='Read More' styles={styles} onPress={() => console.log()} />
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
        paddingBottom: 5,
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
        height: height * .1,
        overflow: 'hidden',
    },
    btn: {
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btntxt: {
        fontSize: 18,
        color: 'rgba(25, 125, 180, 0.95)',
        fontWeight: '500',
        textShadowColor: 'rgba(25, 25, 180, 0.95)',
        textShadowRadius: 1,
    }
})