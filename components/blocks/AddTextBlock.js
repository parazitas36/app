import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../Button';
import AgreeBtn from '../buttons/AgreeBtn';
import DiscardBtn from '../buttons/DiscardBtn';

const AddTextBlock = (props) => {
  return (
    <ScrollView>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={10}
        onChangeText={props.onChangeText}
        placeholder="Enter your text"
        placeholderTextColor={'grey'}
      />
      <View style={styles.viewButtons}>
        <AgreeBtn
          onPress={() => {
            props.onPress();
          }}
        />
        <DiscardBtn
          onPress={() => { props.resetChosen(null) }}
        />
      </View>
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
  },
  viewButtons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center'
  },
})

export default AddTextBlock;
