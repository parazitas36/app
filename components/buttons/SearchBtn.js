import React from 'react'
import { Dimensions, StyleSheet, Pressable, Text, View } from 'react-native';
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
        <View  style={{
            width: 50,
            height: 50,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 90,
            position: 'absolute',
            bottom: 90,
            right: 10,
            zIndex: 9999,
            elevation: 30
        }}>
            <TouchableOpacity>
                <Pressable onPress={props.onPress}>
                    <FontAwesome5 name='search' size={25} color="rgba(0, 0, 0, .75)" />
                </Pressable>
            </TouchableOpacity>
        </View>


    );
}

export default SearchBtn;