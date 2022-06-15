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
        borderWidth: 2,
        borderRadius: 6,
        borderColor: "rgba(255, 255, 255, 0.85)",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        marginRight: 3,
    },
    text: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 7
    }
})

const SaveBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <FontAwesome5 name={props.text !== "Post" ? "save" : "check"} size={30} color="rgba(0, 0, 0, 0.7)"/>
                <Text style={styles.text}>{props.text ? props.text : "Save"}</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default SaveBtn;