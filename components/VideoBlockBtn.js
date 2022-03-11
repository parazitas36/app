import React from 'react'
import { Dimensions, Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VideoBlockBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={props.styles.btn} onPress={props.onPress}>
                <FontAwesome5Icon name='video' size={windowWidth*.1} color="black"/>
                <Text style={props.styles.btntxt}>Video</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default VideoBlockBtn;