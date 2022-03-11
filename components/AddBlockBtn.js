import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    pressableBtn: {
        width: windowWidth*.11,
        height: windowWidth*.11,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
        borderWidth: 3,
        borderRadius: 15,
        width: windowWidth*.4,
        height: windowWidth*.5*.4
    },
    txt: {
        fontSize: 18,
        color: 'black',
    }
})

const AddBlockBtn = (props) => {
  return (
      <TouchableOpacity>
            <Pressable style={styles.pressableBtn} onPress={props.onPress}>
                <FontAwesome5Icon name='plus' size={windowWidth*.1} color="black"/>
                <Text style={styles.txt}>Add Block</Text>
            </Pressable>
      </TouchableOpacity>
      
  )
}

export default AddBlockBtn;