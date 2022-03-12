import React, { createContext } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AddBlockBtn from '../components/AddBlockBtn';
import AddTextBlock from '../components/blocks/AddTextBlock';
import Button from '../components/Button';
import CreateBlockModal from '../components/modals/CreateBlockModal';

export const CreateGuideContext = createContext();

const CreateGuide = () => {
    const [title, setTitle] = React.useState(null);
    const [showBlock, setShowBlock] = React.useState(false);
    const [text, setText] = React.useState(null);
    const [photo, setPhoto] = React.useState(null);
    const [video, setVideo] = React.useState(null);
    const [blocks, setBlocks] = React.useState([]);

    const value = {
        texts: [text, setText],
        photos: [photo, setPhoto],
        videos: [video, setVideo],
        blocks_arr: [blocks, setBlocks],
        showBlocks: [showBlock, setShowBlock]
    }

    React.useLayoutEffect(() => {
        if (text !== null && showBlock === true) {
            setText(null);
        }
    }, [showBlock]);

    const AddBlock = () => {
        if (text === null) { return; }
        setShowBlock(false);
        setBlocks(blocks => [...blocks, text]);
    }

    return (
        <CreateGuideContext.Provider value={value}>
            <View>
                <CreateBlockModal
                    visible={showBlock}
                    goBack={() => setShowBlock(false)}
                    onChangeText={setText}
                    onPress={() => AddBlock()}
                />
                <TextInput
                    style={styles.txtInput}
                    placeholder='Title'
                    onChangeText={setTitle}
                />
                {blocks.map((blk) => {
                    switch(blk.type){
                        case 'text':
                            return <Text>{blk.object}</Text>
                        case 'img':
                            return <Image style={{width: 100, height: 100}} source={{uri:photo.assets[0].uri}}/>
                    }
                })}
                <AddBlockBtn onPress={() => setShowBlock(true)} />
            </View>
        </CreateGuideContext.Provider>
    )
}

const styles = StyleSheet.create({
    txtInput: {
        fontSize: 18,
        borderWidth: 1,
        width: '80%',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        alignSelf: 'center',
        textAlign: 'center'
    }, btn: {

    },
    btntxt: {

    }
})

export default CreateGuide;