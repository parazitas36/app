import { View, Text, Image } from 'react-native'
import React from 'react'
import { ConvertBytesToFile } from '../../api/ConvertBytesToFile'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const ImageBlock = (props) => {
  const [resizeMode, setResizeMode] = React.useState('cover');

  return (
    <View style={props.styles.imageview}>
      <Pressable onPress={()=> {
        if(resizeMode === "contain"){
          setResizeMode("cover")
        }else{
          setResizeMode("contain")
        }
      }}>
      <Image
        style={props.styles.image}
        resizeMode={resizeMode}
        source={{ uri: props.data['pblock']['uri'] }}
      />
      </Pressable>
     
    </View>
  )
}

export default ImageBlock