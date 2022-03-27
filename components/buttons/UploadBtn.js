import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    pressable: {
        width: 200,
        height: 100,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderColor: 'rgba(10, 10, 10, 0.8)',
        borderWidth: 3,
        borderRadius: 20,
        padding: 5,
        marginBottom: 10,
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
        <TouchableOpacity>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <FontAwesome style={styles.icon} name='cloud-upload' size={80} color="black"/>
                <Text style={styles.text}>Upload</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default UploadBtn;