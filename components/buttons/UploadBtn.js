import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    pressable: {
        width: windowWidth*.5,
        height: windowWidth*.25,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        marginLeft: 8,
        fontSize: 22,
        fontWeight: 'bold'
    },
    icon: {
        marginLeft: 5
    }
})

const UploadBtn = (props) => {
    return (
        <TouchableOpacity style={styles.pressable}>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <FontAwesome style={styles.icon} name='cloud-upload' size={windowWidth*.225} color="black"/>
                <Text style={styles.text}>Upload</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default UploadBtn;