import React from 'react'
import { Dimensions, StyleSheet, Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    btn: {
        padding: 15,
    }
})

const SearchBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}
                onPress={props.onPress}>
                <FontAwesome5 name='search' size={25} color="black" />
            </Pressable>
        </TouchableOpacity>
    );
}

export default SearchBtn;