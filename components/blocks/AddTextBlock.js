import React from 'react'
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../Button';

const AddTextBlock = (props) => {
  return (
      <View>
        <TextInput style={styles.input} multiline={true} numberOfLines={10} onChangeText={props.onChangeText}/>
        <Button title='Accept' styles={styles} onPress={() => {props.onPress(); props.resetChosen(null)}} />
        <Button title='Go Back' styles={styles} onPress={() => {props.resetChosen(null)}} />
      </View>
  )
}

const styles = StyleSheet.create({
    btn: {

    },
    btntxt: {

    },
    input:{
      textAlignVertical: 'top'
    }
})

export default AddTextBlock;
