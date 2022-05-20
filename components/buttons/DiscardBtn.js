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
        height: 50,
        borderWidth: 3,
        borderRadius: 6,
        borderColor: "#D82A17",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        marginLeft: 3,
    },
    text: {
        color: '#D82A17',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5
    }
})

const DiscardBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <FontAwesome name='remove' size={windowWidth*.1} color="#D82A17"/>
                <Text style={styles.text}>{!props.title ? "Discard" : props.title}</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default DiscardBtn;