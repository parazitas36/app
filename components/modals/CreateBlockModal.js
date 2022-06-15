import React, { useContext } from 'react'
import { Dimensions, StyleSheet, ScrollView, Modal, View, ImageBackground, Text } from 'react-native';
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
        width: 90,
        alignItems: 'center',
        alignContent: 'center'
    },
    btntxt: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '600',
        fontSize: 14
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
        color: "black",
        fontWeight: '500'
    },
    btn: {
        borderWidth: 1.5,
        padding: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderColor: 'rgba(0, 0, 0, 0.75)'
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
            <View style={{flex: 1}}>
            <ImageBackground source={require('../../assets/images/background.png')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
            {
                chosenBlock === null &&
                <View style={styles.modalBtn}>
                    <Text style={{
                        position: 'absolute', 
                        top: 45, 
                        fontSize: 28, 
                        color: 'rgba(0, 0, 0, 1)',
                        fontWeight: '500',
                    }}>
                        Choose the block type
                    </Text>
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
                        text={text}
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
            </ImageBackground>
            </View>
        </Modal>
    )
}

export default CreateBlockModal;