import React from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../Button';
import AgreeBtn from '../buttons/AgreeBtn';
import DiscardBtn from '../buttons/DiscardBtn';

const AddTextBlock = (props) => {
  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
      <Text style={styles.title}>Text Block</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={10}
        onChangeText={props.onChangeText}
        placeholder="Enter your text"
        placeholderTextColor={'rgba(0, 0, 0, 0.7)'}
      />
      <View style={styles.viewButtons}>
       {props.text !== null && props.text !== "" && <AgreeBtn
          onPress={() => {
            props.onPress();
          }}
        />}
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
  },
  input: {
    marginTop: 5,
    textAlignVertical: 'top',
    borderWidth: 1.15,
    margin: 2,
    borderRadius: 5,
    color: 'black',
    width: '98%',
    alignSelf: 'center',
    paddingHorizontal: 12,
    fontSize: 15,
  },
  viewButtons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    paddingVertical: 10,
    marginBottom: 5,
  }
})

export default AddTextBlock;
