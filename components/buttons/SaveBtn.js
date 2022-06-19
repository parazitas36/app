import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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
        borderColor: "rgba(255, 255, 255, 0.9)",
        backgroundColor: "rgba(123, 145, 170, 1)",
        marginRight: 5,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 22,
        fontWeight: 'bold',
    }
})

const SaveBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <Text style={styles.text}>{props.text ? props.text : "Save"}</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default SaveBtn;