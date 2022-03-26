import React from 'react'
import { Dimensions, Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RemoveBlockBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable onPress={props.onPress}>
                <FontAwesome name='trash-o' size={windowWidth*.1} color="#D82A17"/>
            </Pressable>
        </TouchableOpacity>
    );
}

export default RemoveBlockBtn;