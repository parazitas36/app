import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Button from '../Button';

const AddVideoBlock = (props) => {
    const [photo, setPhoto] = props.photos;
    const uploadVideo = async() => {
        const options = {
            mediaType: 'video'
        }
        const result = await launchImageLibrary(options);
        console.log(result.assets[0].uri)
        setPhoto(result);
    }
  return (
    <View>
        {photo !== null && <Image style={{width: 100, height: 100}} source={{uri:photo.assets[0].uri}}/> }
      <Button styles={styles} onPress={() => uploadVideo()} title={'upload'} />
      <Button title='Accept' styles={styles} onPress={() => {props.onPress()}} />
      <Button title='Go Back' styles={styles} onPress={() => {props.resetChosen(null)}} />
    </View>
  )
}

const styles = StyleSheet.create({
    btn:{

    },
    btntxt:{

    }
});

export default AddVideoBlock;