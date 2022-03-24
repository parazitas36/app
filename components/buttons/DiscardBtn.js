import React from 'react'
import { Dimensions, Pressable, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        borderWidth: 4,
        borderRadius: 6,
        borderColor: "#F72F2F",
        backgroundColor: "#F72F2F",
        marginLeft: 3,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5
    }
})

const DiscardBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <FontAwesome name='remove' size={windowWidth*.1} color="white"/>
                <Text style={styles.text}>Discard</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default DiscardBtn;