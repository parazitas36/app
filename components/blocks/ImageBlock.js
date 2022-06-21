import { View, Text, Image } from 'react-native'
import React from 'react'
import { ConvertBytesToFile } from '../../api/ConvertBytesToFile'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import FastImage from 'react-native-fast-image'

const ImageBlock = (props) => {
  return (
    <View style={props.styles.imageview}>
      <FastImage
        style={props.styles.image}
        resizeMode={FastImage.resizeMode.contain}
        source={{ uri: props.data['pblock']['uri'], priority: FastImage.priority.normal }}
      />
    </View>
  )
}

export default ImageBlock