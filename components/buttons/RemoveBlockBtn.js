import React from 'react'
import { Dimensions, Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RemoveBlockBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable onPress={props.onPress} style={{marginVertical: 5}}>
                <FontAwesome name='trash-o' size={38} color="rgba(223, 71, 89, 0.9)"/>
            </Pressable>
        </TouchableOpacity>
    );
}

export default RemoveBlockBtn;