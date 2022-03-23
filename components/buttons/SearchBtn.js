import React from 'react'
import { Dimensions, Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable onPress={props.onPress}>
                <FontAwesome5 name='search' size={windowWidth*.1} color="black"/>
            </Pressable>
        </TouchableOpacity>
    );
}

export default SearchBtn;