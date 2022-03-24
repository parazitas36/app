import React from 'react'
import { Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Button = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={props.styles.btn} onPress={props.onPress}>
                <Text style={props.styles.btntxt}>{props.title}</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

export default Button;