import { View, Text, Image } from 'react-native'
import React from 'react'
import { ConvertBytesToFile } from '../../api/ConvertBytesToFile'

const ImageBlock = (props) => {
  const uri = ConvertBytesToFile(props.data['image']['contentType'], props.data['image']['fileContents'])

  return (
    <View style={props.styles.imageview}>
      <Image
        style={props.styles.image}
        resizeMode="contain"
        source={{ uri: uri }}
      />
    </View>
  )
}

export default ImageBlock