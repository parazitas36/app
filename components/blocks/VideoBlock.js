import { View, Text, Image } from 'react-native'
import React from 'react'
import { ConvertBytesToFile } from '../../api/ConvertBytesToFile'
import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-player'

const VideoBlock = (props) => {
  //const uri = ConvertBytesToFile(props.data['video']['contentType'], props.data['video']['fileContents'])

  return (
    <View style={props.styles.videoview}>
      <VideoPlayer
        video={{uri: `http://localhost:5000/api/files/${props.data['vblock']['fileName']}`}}
        resizeMode="contain"
        fullScreenOnLongPress={true}
        pauseOnPress={true}
        customStyles={{
          controls: {
            width: '100%',
            paddingHorizontal: 5,
          },
          wrapper: {
            flex: 1,
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 20,
          },
          videoWrapper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          },
          seekBarProgress: {
            backgroundColor: 'rgba(55, 155, 200, 1)'
          },
          seekBarKnob: {
            backgroundColor: 'white'
          },
          video: {
          }
        }}
      />
    </View>
  )
}

export default VideoBlock