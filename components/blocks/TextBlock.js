import { View, Text } from 'react-native'
import React from 'react'

const TextBlock = (props) => {
  return (
    <View style={props.styles.textview}>
      <Text style={props.styles.text}>{props.text}</Text>
    </View>
  )
}

export default TextBlock