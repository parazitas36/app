import React from 'react'
import { Dimensions, StyleSheet, Pressable, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    btn:{
        padding: 15,
    }
})

const SearchBtn = (props) => {
    return (
        <TouchableOpacity>
            <Pressable style={styles.btn} onPress={props.onPress}>
                <FontAwesome5 name='search' size={windowWidth * 0.05} color="grey"/>
            </Pressable>
        </TouchableOpacity>
    );
}

export default SearchBtn;