import React, { createContext } from 'react'
import { Dimensions, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Video from 'react-native-video';
import AddBlockBtn from '../components/buttons/AddBlockBtn';
import AddTextBlock from '../components/blocks/AddTextBlock';
import Button from '../components/Button';
import CreateBlockModal from '../components/modals/CreateBlockModal';
import Block from '../components/blocks/Block';
import EditTextModal from '../components/modals/EditTextModal';
import EditVideoModal from '../components/modals/EditVideoModal';
import EditPhotoModal from '../components/modals/EditPhotoModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const CreateGuideContext = createContext();

const CreateGuide = () => {
    const [title, setTitle] = React.useState(null);
    const [showBlock, setShowBlock] = React.useState(false);
    const [showEditText, setShowEditText] = React.useState(false);
    const [showEditPhoto, setShowEditPhoto] = React.useState(false);
    const [showEditVideo, setShowEditVideo] = React.useState(false);
    const [editID, setEditID] = React.useState(null);
    const [text, setText] = React.useState(null);
    const [photo, setPhoto] = React.useState(null);
    const [video, setVideo] = React.useState(null);
    const [blocks, setBlocks] = React.useState([]);
    const [block_id, setBlockID] = React.useState(0);
    const [rerender, setRerender] = React.useState(false);

    const value = {
        texts: [text, setText],
        photos: [photo, setPhoto],
        videos: [video, setVideo],
        blocks_arr: [blocks, setBlocks],
        showBlocks: [showBlock, setShowBlock],
        blockids: [block_id, setBlockID],
        editId: [editID, setEditID],
        editText: [showEditText, setShowEditText],
        editVideo: [showEditVideo, setShowEditVideo],
        editPhoto: [showEditPhoto, setShowEditPhoto]
    }

    // Pakelia bloka i virsu
    const Up = (id) => {
        console.log(id, blocks[id].object)
        if(id === 0) { return; }
        else{
            const prev = blocks[id-1];
            blocks[id-1] = blocks[id];
            blocks[id] = prev;
            blocks[id-1].id = id-1;
            blocks[id].id = id;
            setBlocks(blocks);
            setRerender(true);
        }
    }

    // Nuleidzia bloka zemiau
    const Down = (id) => {
        console.log(id, blocks[id].object)
        if(id === blocks.length-1) { return; }
        else{
            const next = blocks[id+1];
            blocks[id+1] = blocks[id];
            blocks[id] = next;
            blocks[id].id = id;
            blocks[id+1].id = id+1;
            setBlocks(blocks);
            setRerender(true);
        }
    }

    // Nustato kokio tipo bloka redaguoti, pagal tai atidaromas langas
    const Edit = (id) => {
        const obj = blocks[id];

        switch(obj.type){
            case "text":
                setShowEditText(true);
                setEditID(id);
                break;
            case "img":
                setShowEditPhoto(true);
                setEditID(id);
                break;
            case "video":
                setShowEditVideo(true);
                setEditID(id);
                break;
        }
    }

    // Pasalina bloka
    const Remove = (id) => {
        for(var i = id; i < blocks.length-1; i++){
            blocks[i] = blocks[i+1];
            blocks[i].id--;
        }
        blocks.pop();
        setBlockID(block_id-1);
    }

    React.useLayoutEffect(() => {
        if ((text !== null || photo !== null || video !== null)
            && showBlock === true) {
            setText(null);
            setPhoto(null);
            setVideo(null);
        }
        setRerender(false);
    }, [showBlock, rerender]);



    return (
        <CreateGuideContext.Provider value={value}>
            <ScrollView contentContainerStyle={styles.container}>
                <CreateBlockModal
                    visible={showBlock}
                    goBack={() => setShowBlock(false)}
                />
                <EditTextModal />
                <EditVideoModal />
                <EditPhotoModal />
                <TextInput
                    style={styles.txtInput}
                    placeholder='Title'
                    multiline={true}
                    onChangeText={setTitle}
                    placeholderTextColor={'grey'}
                />
                {
                    blocks.map((item) => {
                        return Block(item, Up, Down, Edit, Remove);
                    })
                }
                <AddBlockBtn onPress={() => setShowBlock(true)} />
            </ScrollView>
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
        textAlign: 'center',
        color: 'grey'
    }, btn: {

    },
    btntxt: {
        color: 'black'
    },
    container: {
        paddingVertical: 10,
    }
})

export default CreateGuide;