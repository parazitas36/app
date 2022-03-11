import React from 'react'
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../Button';

const AddTextBlock = (props) => {
  return (
      <View>
        <TextInput onChangeText={props.onChangeText}/>
        <Button title='Accept' styles={styles} onPress={props.onPress} />
      </View>
  )
}

const styles = StyleSheet.create({
    btn: {

    },
    btntxt: {

    }
})

export default AddTextBlock;
