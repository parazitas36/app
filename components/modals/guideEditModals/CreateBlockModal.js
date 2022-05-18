import React, { useContext } from 'react'
import { Dimensions, StyleSheet, ScrollView, Modal, View } from 'react-native';
import { EditGuideContext } from '../../../screens/EditGuide';
import AddPhotoBlock from '../../blocks/AddPhotoBlock';
import AddTextBlock from '../../blocks/AddTextBlock';
import AddVideoBlock from '../../blocks/AddVideoBlock';
import Button from '../../Button';
import PhotoBlockBtn from '../../buttons/PhotoBlockBtn';
import TextBlockBtn from '../../buttons/TextBlockBtn';
import VideoBlockBtn from '../../buttons/VideoBlockBtn';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    btn: {
        width: windowWidth * .2,
        alignItems: 'center',
        alignContent: 'center'
    },
    btntxt: {
        textAlign: 'center',
        color: 'black'
    },
    modal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    modalBtn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        marginBottom: 100
    },
});

const backBtnStyle = StyleSheet.create({
    btntxt: {
        fontSize: 16,
        color: "black"
    },
    btn: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
        paddingHorizontal: 10
    }
});

const CreateBlockModal = (props) => {
    const [chosenBlock, setChosenBlock] = React.useState(null);
    const { texts, photos, videos, blocks_arr, showBlocks, blockids } = useContext(EditGuideContext);

    const [blocks, setBlocks] = blocks_arr;
    const [showBlock, setShowBlock] = showBlocks;
    const [text, setText] = texts;
    const [photo, setPhoto] = photos;
    const [video, setVideo] = videos;
    const [block_id, setBlockID] = blockids;

    return (
        <Modal animationType='slide' visible={showBlock}>
            {
                chosenBlock === null &&
                <View style={styles.modalBtn}>
                    <View style={styles.modal}>
                        <TextBlockBtn styles={styles} onPress={() => setChosenBlock('Text')} />
                        <VideoBlockBtn styles={styles} onPress={() => setChosenBlock('Video')} />
                        <PhotoBlockBtn styles={styles} onPress={() => setChosenBlock('Image')} />
                    </View>
                    <Button styles={backBtnStyle} title={'Return'} onPress={props.goBack} />
                </View>
            }
            {
                chosenBlock === 'Text' &&
                <ScrollView>
                    <AddTextBlock
                        styles={styles}
                        onChangeText={setText}
                        onPress={() => {
                            if (text === null || text === "") { alert('No text has been entered!'); return; }
                            setShowBlock(false);
                            setBlocks(blocks => [...blocks, { type: 'Text', object: text, id: block_id }])
                            setBlockID(block_id + 1);
                            setChosenBlock(null);
                        }}
                        resetChosen={setChosenBlock}
                    />
                </ScrollView>
            }
            {
                chosenBlock === 'Image' &&
                <ScrollView>
                    <AddPhotoBlock
                        photos={photos}
                        onPress={() => {
                            if (photo === null) { alert('No photo has been selected!'); return; }
                            setShowBlock(false);
                            setBlocks(blocks => [...blocks, { type: 'Image', object: photo, id: block_id }])
                            setBlockID(block_id + 1);
                            setChosenBlock(null);
                        }}
                        resetChosen={setChosenBlock}
                    />
                </ScrollView>
            }
            {
                chosenBlock === 'Video' &&
                <ScrollView>
                    <AddVideoBlock
                        videos={videos}
                        onPress={() => {
                            if (video === null) { alert('No video has been selected!'); return; }
                            setShowBlock(false);
                            setBlocks(blocks => [...blocks, { type: 'Video', object: video, id: block_id }])
                            setBlockID(block_id + 1);
                            setChosenBlock(null);
                            console.log(video.assets[0].name)
                        }}
                        resetChosen={setChosenBlock}
                    />
                </ScrollView>
            }
        </Modal>
    )
}

export default CreateBlockModal;