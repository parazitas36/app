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
        borderColor: "#1F9B0C",
        backgroundColor: "#fefefe",
        marginRight: 3,
    },
    text: {
        color: '#1F9B0C',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5
    }
})

const AgreeBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={styles.pressable} onPress={props.onPress}>
                <FontAwesome5 name='check-square' size={windowWidth*.1} color="#1F9B0C"/>
                <Text style={styles.text}>Add</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default AgreeBtn;