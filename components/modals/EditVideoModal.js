import { Dimensions, ScrollView, TextInput, View, Modal, StyleSheet, ImageBackground, Text } from 'react-native'
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
                <View style={{ flex: 1 }}>
                    <ImageBackground source={require('../../assets/images/background.png')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                            <Text style={styles.title}>Video Block</Text>
                            <View style={styles.view}>
                                <UploadBtn onPress={uploadVideo} title="Change"/>
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
                                    {video && <AgreeBtn
                                        onPress={() => {
                                            if (video === null) { alert('No video has been selected!'); return; }
                                            else {
                                                blocks[editID].object = video;
                                                setShowEditVideo(false);
                                            }
                                        }}
                                        title="Save"
                                    />}
                                    <DiscardBtn
                                        onPress={() => { setShowEditVideo(false); }}
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
    videoView: {
        flex: 1,
        height: windowHeight * .6,
        width: '100%'
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

export default EditVideoModal