import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Button from '../Button';

const AddPhotoBlock = (props) => {
    const [photo, setPhoto] = React.useState(null);
    const uploadPhoto = async() => {
        const result = await launchImageLibrary();
        console.log(result.assets[0].uri)
        setPhoto(result);
    }
  return (
    <View>
        {photo !== null && <Image style={{width: 100, height: 100}} source={{uri:photo.assets[0].uri}}/> }
      <Button styles={styles} onPress={() => uploadPhoto()} title={'upload'} />
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

export default AddPhotoBlock;