import React from 'react'
import { Pressable, Text } from 'react-native';

const Button = (props) => {
    return (
        <Pressable style={props.styles.btn} onPress={props.onPress}>
            <Text style={props.styles.btntxt}>{props.title}</Text>
        </Pressable>
    );
}

export default Button;