import React, { useContext } from 'react'
import { Dimensions, StyleSheet, ScrollView, Modal, View } from 'react-native';
import { CreateGuideContext } from '../../screens/CreateGuide';
import AddPhotoBlock from '../blocks/AddPhotoBlock';
import AddTextBlock from '../blocks/AddTextBlock';
import AddVideoBlock from '../blocks/AddVideoBlock';
import Button from '../Button';
import PhotoBlockBtn from '../buttons/PhotoBlockBtn';
import TextBlockBtn from '../buttons/TextBlockBtn';
import VideoBlockBtn from '../buttons/VideoBlockBtn';

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
    const { texts, photos, videos, blocks_arr, showBlocks, blockids } = useContext(CreateGuideContext);

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
                        <PhotoBlockBtn styles={styles} onPress={() => setChosenBlock('Photo')} />
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
                            if (text === null) { return; }
                            setShowBlock(false);
                            setBlocks(blocks => [...blocks, { type: 'text', object: text, id: block_id}])
                            setBlockID(block_id+1);
                            setChosenBlock(null);
                        }}
                        resetChosen={setChosenBlock}
                    />
                </ScrollView>
            }
            {
                chosenBlock === 'Photo' &&
                <ScrollView>
                    <AddPhotoBlock
                        photos={photos}
                        onPress={() => {
                            if(photo === null) { return; }
                            setShowBlock(false);
                            setBlocks(blocks=>[...blocks, {type:'img', object: photo, id: block_id}])
                            setBlockID(block_id+1);
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
                            if(video === null) { return; }
                            setShowBlock(false);
                            setBlocks(blocks=>[...blocks, {type:'video', object: video, id: block_id}])
                            setBlockID(block_id+1);
                            setChosenBlock(null);
                        }}
                        resetChosen={setChosenBlock}
                    />
                </ScrollView>
            }
        </Modal>
    )
}

export default CreateBlockModal;