import { Dimensions, ScrollView, TextInput, Modal, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { CreateGuideContext } from '../../screens/CreateGuide'
import Button from '../Button'
import Video from 'react-native-video'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditVideoModal = (props) => {
    const { videos, blocks_arr, showBlocks, blockids, editVideo, editId } = useContext(CreateGuideContext);

    const [blocks, setBlocks] = blocks_arr;
    const [showBlock, setShowBlock] = showBlocks;
    const [video, setVideo] = videos;
    const [block_id, setBlockID] = blockids;
    const [showEditVideo, setShowEditVideo] = editVideo;
    const [editID, setEditID] = editId;

    const uploadVideo = async () => {
        const options = {
            mediaType: 'video'
        }
        const result = await launchImageLibrary(options);
        setVideo(result);
        blocks[editID].object = result;
    }

    if (showEditVideo) {
        return (
            <Modal animationType='slide' visible={showEditVideo}>
                <ScrollView>
                    {video !== null &&
                    <Video
                        controls={false}
                        style={{ height: windowHeight*.6}}
                        source={{ uri: video.assets[0].uri }}
                    />}
                    <Button styles={styles} onPress={() => uploadVideo()} title={'upload'} />
                    <Button
                        title='Accept'
                        styles={styles}
                        onPress={() => {
                            if (video === null) { return; }
                            else {
                                setShowEditVideo(false);
                            }
                        }
                        }
                    />
                    <Button
                        title='Return'
                        styles={styles}
                        onPress={() => { setShowEditVideo(false); }}
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

export default EditVideoModal