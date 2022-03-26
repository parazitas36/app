import { Dimensions, View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Button from '../Button';
import UploadBtn from '../buttons/UploadBtn';
import AgreeBtn from '../buttons/AgreeBtn';
import DiscardBtn from '../buttons/DiscardBtn';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddPhotoBlock = (props) => {
    const [photo, setPhoto] = props.photos;

    React.useLayoutEffect(() => {
        if (photo !== null) {
            setPhoto(null);
        }
    }, [])

    const uploadPhoto = async () => {
        const options = {
            mediaType: 'photo'
        }

        try {
            const result = await launchImageLibrary(options);
            if (result.didCancel) {
                setPhoto(null);
            } else {
                setPhoto(result);
            }
        } catch (e) {
            setPhoto(null);
        }
    }
    return (
        <View style={styles.view}>
            <UploadBtn onPress={uploadPhoto} />
            {photo &&
                <View style={styles.imageView}>
                    <Image
                        resizeMode='contain'
                        style={
                            {
                                flex: 1,
                                height: undefined,
                                width: undefined
                            }
                        }
                        source={{ uri: photo.assets[0].uri }}
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
    },
    viewButtons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20
    },
    imageView: {
        height: windowHeight * .6,
        width: '90%'
    }
});

export default AddPhotoBlock;