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
        width: 110,
        height: 45,
        borderWidth: 1.25,
        borderRadius: 6,
        borderColor: "rgba(0, 0, 0, 0.85)",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        marginLeft: 5,
    },
    text: {
        color: 'rgba(0, 0, 0, 0.85)',
        fontSize: 25,
        fontWeight: '500',
    }
})

const DiscardBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <Text style={styles.text}>{!props.title ? "Return" : props.title}</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default DiscardBtn;