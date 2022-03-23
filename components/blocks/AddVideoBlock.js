import { Dimensions, View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Button from '../Button';
import Video from 'react-native-video';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddVideoBlock = (props) => {
    const [video, setVideo] = props.videos;

    React.useLayoutEffect(()=> {
        if(video !== null){
            setVideo(null);
        }
    }, [])

    const uploadVideo = async () => {
        const options = {
            mediaType: 'video'
        }
        const result = await launchImageLibrary(options);
        setVideo(result);
    }
    return (
        <View>
            {video !== null &&
                <Video
                    controls={true}
                    style={{ height: windowHeight*.6}}
                    source={{ uri: video.assets[0].uri }}
                />}
            <Button styles={styles} onPress={() => uploadVideo()} title={'upload'} />
            <Button title='Accept' styles={styles} onPress={() => { props.onPress() }} />
            <Button title='Go Back' styles={styles} onPress={() => { props.resetChosen(null) }} />
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {

    },
    btntxt: {
        color: 'black',
    }
});

export default AddVideoBlock;