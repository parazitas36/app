import React from 'react'
import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    pressableBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 3,
        borderRadius: 15,
        borderStyle: 'dashed',
        width: 150,
        height: 80,
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
                <FontAwesome5Icon name='plus' size={35} color="black"/>
                <Text style={styles.txt}>Add Block</Text>
            </Pressable>
      </TouchableOpacity>
      
  )
}

export default AddBlockBtn;