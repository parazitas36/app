import { Dimensions, View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Button from '../Button';
import Video from 'react-native-video';
import UploadBtn from '../buttons/UploadBtn';
import AgreeBtn from '../buttons/AgreeBtn';
import DiscardBtn from '../buttons/DiscardBtn';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddVideoBlock = (props) => {
    const [video, setVideo] = props.videos;

    React.useLayoutEffect(() => {
        if (video !== null) {
            setVideo(null);
        }
    }, [])

    const uploadVideo = async () => {
        const options = {
            mediaType: 'video'
        }

        try {
            const result = await launchImageLibrary(options);
            if (result.didCancel) {
                setVideo(null);
            } else {
                setVideo(result);
            }

        } catch (e) {
            setVideo(null);
        }
    }
    return (
        <View style={styles.view}>
            <UploadBtn onPress={uploadVideo} />
            {video &&
                <View style={styles.videoView}>
                    <Video
                        resizeMode='contain'
                        paused={false}
                        style={{ flex: 1, height: undefined, width: undefined }}
                        source={{ uri: video.assets[0].uri }}
                    />
                </View>
            }
            <View style={styles.viewButtons}>
                <AgreeBtn onPress={() => { props.onPress() }} />
                <DiscardBtn onPress={() => { props.resetChosen(null) }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {

    },
    btntxt: {
        color: 'black',
    },
    view: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    viewButtons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20
    },
    videoView: {
        flex: 1,
        height: windowHeight * .6,
        width: '100%'
    }
});

export default AddVideoBlock;