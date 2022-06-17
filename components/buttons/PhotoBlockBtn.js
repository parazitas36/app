import React from 'react'
import { Dimensions, Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PhotoBlockBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={props.styles.btn} onPress={props.onPress}>
                <FontAwesome name='photo' size={windowWidth*.1} color="black"/>
                <Text style={props.styles.btntxt}>Image</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default PhotoBlockBtn;