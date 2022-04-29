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
        width: 120,
        height: 50,
        borderWidth: 3,
        borderRadius: 6,
        borderColor: "rgba(55, 155, 200, 1)",
        backgroundColor: "#fefefe",
        marginRight: 3,
    },
    text: {
        color: 'rgba(55, 155, 200, 1)',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5
    }
})

const SaveBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <FontAwesome5 name='save' size={windowWidth*.1} color="rgba(55, 155, 200, 1)"/>
                <Text style={styles.text}>{props.text ? props.text : "Save"}</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default SaveBtn;