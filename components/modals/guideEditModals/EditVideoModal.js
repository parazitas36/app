import { Dimensions, ScrollView, TextInput, View, Modal, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { EditGuideContext } from '../../../screens/EditGuide';
import Button from '../../Button'
import Video from 'react-native-video'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import UploadBtn from '../../buttons/UploadBtn'
import AgreeBtn from '../../buttons/AgreeBtn'
import DiscardBtn from '../../buttons/DiscardBtn'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditVideoModal = (props) => {
    const { videos, blocks_arr, showBlocks, blockids, editVideo, editId } = useContext(EditGuideContext);

    const [blocks, setBlocks] = blocks_arr;
    const [showBlock, setShowBlock] = showBlocks;
    const [video, setVideo] = videos;
    const [block_id, setBlockID] = blockids;
    const [showEditVideo, setShowEditVideo] = editVideo;
    const [editID, setEditID] = editId;

    React.useLayoutEffect(() => {
        if (showEditVideo) {
            setVideo(blocks[editID].object);
        }
    }, [showEditVideo])

    const uploadVideo = async () => {
        const options = {
            mediaType: 'video'
        }
        try {
            const result = await launchImageLibrary(options);
            if (!result.didCancel) {
                setVideo(result);
            }
        } catch (e) {
            setVideo(null);
            blocks[editID] = null;
        }
    }

    if (showEditVideo) {
        return (
            <Modal animationType='slide' visible={showEditVideo}>
                <ScrollView>
                    <View style={styles.view}>
                        <UploadBtn onPress={uploadVideo} />
                        {video &&
                            <View style={styles.videoView}>
                                <Video
                                    controls={false}
                                    resizeMode='contain'
                                    style={{ flex: 1, height: undefined, width: undefined }}
                                    source={{ uri: video.assets[0].uri }}
                                />
                            </View>
                        }
                        <View style={styles.viewButtons}>
                            <AgreeBtn
                                onPress={() => {
                                    if (video === null) { alert('No video has been selected!'); return; }
                                    else {
                                        blocks[editID].object = video;
                                        setShowEditVideo(false);
                                    }
                                }}
                            />
                            <DiscardBtn
                                onPress={() => { setShowEditVideo(false); }}
                            />
                        </View>
                    </View>
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
})

export default EditVideoModal