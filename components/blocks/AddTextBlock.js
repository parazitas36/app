import React from 'react'
import { StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../Button';

const AddTextBlock = (props) => {
  return (
    <ScrollView>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={10}
        onChangeText={props.onChangeText}
        placeholder="Enter your text"
      />
      <Button
        title='Accept'
        styles={styles}
        onPress={() => {
            props.onPress();
          }
        }
      />
      <Button
        title='Go Back'
        styles={styles}
        onPress={() => { props.resetChosen(null) }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  btn: {

  },
  btntxt: {
    color: 'black',

  },
  input: {
    textAlignVertical: 'top',
    borderWidth: 1,
    margin: 2,
    borderRadius: 5,
    color: 'black',
  }
})

export default AddTextBlock;
