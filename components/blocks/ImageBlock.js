import { View, Text, Image } from 'react-native'
import React from 'react'
import { ConvertBytesToFile } from '../../api/ConvertBytesToFile'

const ImageBlock = (props) => {
  return (
    <View style={props.styles.imageview}>
      <Image
        style={props.styles.image}
        resizeMode="contain"
        resizeMethod="scale"
        source={{ uri: props.data['pblock']['uri'] }}
      />
    </View>
  )
}

export default ImageBlock