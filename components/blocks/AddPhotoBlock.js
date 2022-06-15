import { Dimensions, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
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
        <ScrollView contentContainerStyle={styles.view}>
            <Text style={styles.title}>Image Block</Text>
            <UploadBtn onPress={uploadPhoto} title={photo ? "Change" : "Upload"} />
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
                {photo && <AgreeBtn onPress={() => { props.onPress() }} />}
                <DiscardBtn onPress={() => { props.resetChosen(null) }} />
            </View>
        </ScrollView>
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
        paddingBottom: 20,
    },
    viewButtons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    imageView: {
        height: windowHeight * .6,
        width: '90%'
    },
    title: {
        fontSize: 28,
        color: 'black',
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: 10,
        marginBottom: 10,
        marginTop: 10,
    }
});

export default AddPhotoBlock;