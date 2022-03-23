import React from 'react'
import { Dimensions, Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditBlockBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable onPress={props.onPress}>
                <FontAwesome name='pencil' size={windowWidth*.1} color="black"/>
            </Pressable>
        </TouchableOpacity>
    );
}

export default EditBlockBtn;