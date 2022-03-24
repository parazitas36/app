import { Dimensions, ScrollView, TextInput, View,  Modal, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { CreateGuideContext } from '../../screens/CreateGuide'
import Button from '../Button'
import Video from 'react-native-video'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import UploadBtn from '../buttons/UploadBtn'
import AgreeBtn from '../buttons/AgreeBtn'
import DiscardBtn from '../buttons/DiscardBtn'

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
                    <View style={styles.view}>
                        <UploadBtn onPress={uploadVideo} />
                        {video !== null &&
                            <View style={styles.videoView}>
                                <Video
                                    controls={false}
                                    resizeMode='contain'
                                    style={{ flex: 1, height: undefined, width: undefined}}
                                    source={{ uri: video.assets[0].uri }}
                                />
                            </View>
                        }
                        <View style={styles.viewButtons}>
                            <AgreeBtn
                                onPress={() => {
                                    if (video === null) { return; }
                                    else {
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