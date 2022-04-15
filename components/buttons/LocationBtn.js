import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 200,
        height: 50,
        backgroundColor: "transparent",
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    }
})

const LocationBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <Text style={styles.text}>Pick Location</Text>
                <MaterialIcons name={`${props.function}-location`} size={windowWidth*.11} color="black"/>
            </Pressable>
        </TouchableOpacity>
    );
}

export default LocationBtn;