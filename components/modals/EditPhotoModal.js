import { ScrollView, TextInput, Modal, StyleSheet, Image } from 'react-native'
import React, { useContext } from 'react'
import { CreateGuideContext } from '../../screens/CreateGuide'
import Button from '../Button'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const EditPhotoModal = (props) => {
    const { photos, blocks_arr, showBlocks, blockids, editPhoto, editId } = useContext(CreateGuideContext);

    const [blocks, setBlocks] = blocks_arr;
    const [showBlock, setShowBlock] = showBlocks;
    const [photo, setPhoto] = photos;
    const [block_id, setBlockID] = blockids;
    const [showEditPhoto, setShowEditPhoto] = editPhoto;
    const [editID, setEditID] = editId;

    const uploadPhoto = async () => {
        const options = {
            mediaType: 'photo'
        }
        const result = await launchImageLibrary(options);
        setPhoto(result);
        blocks[editID].object = result;
    }

    if (showEditPhoto) {
        return (
            <Modal animationType='slide' visible={showEditPhoto}>
                <ScrollView>
                    {photo !== null && <Image style={{ width: 100, height: 100 }} source={{ uri: photo.assets[0].uri }} />}
                    <Button styles={styles} onPress={() => uploadPhoto()} title={'upload'} />
                    <Button
                        title='Accept'
                        styles={styles}
                        onPress={() => {
                            if (photo === null) { return; }
                            else {
                                setShowEditPhoto(false);
                            }
                        }
                        }
                    />
                    <Button
                        title='Return'
                        styles={styles}
                        onPress={() => { setShowEditPhoto(false); }}
                    />
                </ScrollView>
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
    }
})

export default EditPhotoModal