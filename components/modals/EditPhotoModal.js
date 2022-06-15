import { Dimensions, ScrollView, TextInput, View, Modal, StyleSheet, Image, ImageBackground, Text } from 'react-native'
import React, { useContext } from 'react'
import { CreateGuideContext } from '../../screens/CreateGuide'
import Button from '../Button'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import UploadBtn from '../buttons/UploadBtn';
import AgreeBtn from '../buttons/AgreeBtn';
import DiscardBtn from '../buttons/DiscardBtn';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditPhotoModal = (props) => {
    const { photos, blocks_arr, showBlocks, blockids, editPhoto, editId } = useContext(CreateGuideContext);

    const [blocks, setBlocks] = blocks_arr;
    const [showBlock, setShowBlock] = showBlocks;
    const [photo, setPhoto] = photos;
    const [block_id, setBlockID] = blockids;
    const [showEditPhoto, setShowEditPhoto] = editPhoto;
    const [editID, setEditID] = editId;

    React.useLayoutEffect(() => {
        if (showEditPhoto) {
            setPhoto(blocks[editID].object);
        }
    }, [showEditPhoto])

    const uploadPhoto = async () => {
        const options = {
            mediaType: 'photo'
        }

        try {
            const result = await launchImageLibrary(options);
            if (!result.didCancel) {
                setPhoto(result);
            }
        }
        catch (e) {
            setPhoto(null);
            blocks[editID] = null;
        }
    }

    if (showEditPhoto) {
        return (
            <Modal animationType='slide' visible={showEditPhoto}>
                <View style={{ flex: 1 }}>
                    <ImageBackground source={require('../../assets/images/background.png')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                            <Text style={styles.title}>Image Block</Text>
                            <View style={styles.view}>
                                <UploadBtn onPress={uploadPhoto} title="Change"/>
                                {photo &&
                                    <View style={styles.imageView}>
                                        <Image
                                            style={{ flex: 1, height: undefined, width: undefined }}
                                            source={{ uri: photo.assets[0].uri }} />
                                    </View>
                                }
                                <View style={styles.viewButtons}>
                                    {photo && <AgreeBtn
                                        onPress={
                                            () => {
                                                if (photo === null) { alert('No photo has been selected!'); return; }
                                                else {
                                                    blocks[editID].object = photo;
                                                    setShowEditPhoto(false);
                                                }
                                            }
                                        }
                                        title="Save"
                                    />}
                                    <DiscardBtn onPress={
                                        () => { setShowEditPhoto(false); }
                                    }
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            </Modal>
        )
    }
    else {
        return null;
    }
}

const styles = StyleSheet.create({
    btn: {

    },
    btntxt: {
        color: 'black',

    },
    input: {
        textAlignVertical: 'top',
        borderWidth: 1,
        margin: 2,
        borderRadius: 5,
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
        marginTop: 15
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
})

export default EditPhotoModal