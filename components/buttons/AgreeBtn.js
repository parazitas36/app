import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        height: 45,
        borderWidth: 2,
        borderRadius: 6,
        borderColor: "rgba(0, 0, 0, 0.9)",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        marginRight: 5,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 25,
        fontWeight: '500',
    }
})

const AgreeBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <Text style={styles.text}>{props.title ? props.title : "Add"}</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default AgreeBtn;