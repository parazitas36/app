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
        borderWidth: 2,
        borderRadius: 6,
        borderColor: "rgba(223, 71, 89, 0.85)",
        backgroundColor: "rgba(223, 71, 89, 0.85)",
        marginLeft: 5,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: 25,
        fontWeight: '500',
    }
})

const ClearBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <Text style={styles.text}>{!props.title ? "Return" : props.title}</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default ClearBtn;