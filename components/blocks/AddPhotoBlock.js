import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Button from '../Button';

const AddPhotoBlock = (props) => {
    const [photo, setPhoto] = props.photos;

    React.useLayoutEffect(()=> {
        if(photo !== null){
            setPhoto(null);
        }
    }, [])

    const uploadPhoto = async() => {
        const options = {
            mediaType: 'photo'
        }
        const result = await launchImageLibrary(options);
        console.log(result.assets[0].uri)
        setPhoto(result);
    }
  return (
    <View>
        {photo !== null && <Image style={{width: 100, height: 100}} source={{uri:photo.assets[0].uri}}/> }
      <Button styles={styles} onPress={() => uploadPhoto()} title={'upload'} />
      <Button title='Accept' styles={styles} onPress={() => {props.onPress()}} />
      <Button title='Go Back' styles={styles} onPress={() => {props.resetChosen(null)}} />
    </View>
  )
}

const styles = StyleSheet.create({
    btn:{

    },
    btntxt:{
        color: 'black',

    }
});

export default AddPhotoBlock;