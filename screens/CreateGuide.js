import React, { createContext, useContext } from 'react'
import { Dimensions, ScrollView, Text, StyleSheet, Image, View } from 'react-native';
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
import { PostGuide } from '../api/PostGuide';
import SaveBtn from '../components/buttons/SaveBtn';
import DiscardBtn from '../components/buttons/DiscardBtn';
import { Context } from '../App';
import LocationBtn from '../components/buttons/LocationBtn';
import { ActivityIndicator } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const CreateGuideContext = createContext();

const CreateGuide = ({ navigation }) => {
    const categories = [
        "Museums",
        "Ancient Buildings",
        "Art Galleries",
        "Nature Walks",
        "Zoos",
        "Other"
    ];
    const [title, setTitle] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [location, setLocation] = React.useState(null);
    const [city, setCity] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [publish, setPublish] = React.useState(false);

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
    const [waiting, setWaiting] = React.useState(false);

    const { accInfo } = useContext(Context);
    const [userInfo, setUserInfo] = accInfo;

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
        if (id === 0) { return; }
        else {
            const prev = blocks[id - 1];
            blocks[id - 1] = blocks[id];
            blocks[id] = prev;
            blocks[id - 1].id = id - 1;
            blocks[id].id = id;
            setBlocks(blocks);
            setRerender(true);
        }
    }

    // Nuleidzia bloka zemiau
    const Down = (id) => {
        console.log(id, blocks[id].object)
        if (id === blocks.length - 1) { return; }
        else {
            const next = blocks[id + 1];
            blocks[id + 1] = blocks[id];
            blocks[id] = next;
            blocks[id].id = id;
            blocks[id + 1].id = id + 1;
            setBlocks(blocks);
            setRerender(true);
        }
    }

    // Nustato kokio tipo bloka redaguoti, pagal tai atidaromas langas
    const Edit = (id) => {
        const obj = blocks[id];

        switch (obj.type) {
            case "Text":
                setShowEditText(true);
                setEditID(id);
                break;
            case "Image":
                setShowEditPhoto(true);
                setEditID(id);
                break;
            case "Video":
                setShowEditVideo(true);
                setEditID(id);
                break;
        }
    }

    // Pasalina bloka
    const Remove = (id) => {
        for (var i = id; i < blocks.length - 1; i++) {
            blocks[i] = blocks[i + 1];
            blocks[i].id--;
        }
        blocks.pop();
        setBlockID(block_id - 1);
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
    //Waiting true tik tada kai bandai sukurt gida ir papostint tada ijungia true kad zinot kada ikelia viska i duombazes
    if (waiting) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ justifyContent: 'center', marginTop: 50 }} />
                <Text style={{ fontSize: 30, justifyContent: 'center', textAlign: 'center', color: 'black', marginTop: 15 }}>Uploading</Text>
            </View>
        )
    }

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

                <TextInput
                    style={styles.description}
                    placeholder='Description'
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={setDescription}
                    placeholderTextColor={'grey'}
                />

                {
                    blocks.map((item) => {
                        return Block(item, Up, Down, Edit, Remove);
                    })
                }

                <AddBlockBtn onPress={() => setShowBlock(true)} />

                <LocationBtn function={city ? "edit" : "add"} onPress={() => navigation.navigate("Maps", { lct: [location, setLocation], setCity })} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        color: 'black',
                        width: '30%',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: 16
                    }}>
                        Category:
                    </Text>
                    <Picker
                        style={{ width: '70%' }}
                        selectedValue={category}
                        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                    >
                        {
                            categories.map((cat) => {
                                return <Picker.Item label={cat} value={cat} />
                            })
                        }
                    </Picker>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        color: 'black',
                        fontWeight: '500',
                        fontSize: 16
                    }}>Public: </Text>
                    <CheckBox value={publish} onValueChange={setPublish} />
                </View>
                {blocks.length > 0 &&
                    <View style={styles.viewButtons}>
                        <SaveBtn
                            text={publish ? "Post" : "Save"}
                            onPress={async () => {
                                setWaiting(true);
                                const resp = await PostGuide(
                                    blocks, 
                                    title, 
                                    description, 
                                    userInfo['_id'], 
                                    location['latitude'], 
                                    location['longitude'], city,
                                    category,
                                    publish
                                )
                                if (resp) {
                                    setWaiting(false);
                                    setBlocks([]);
                                    setTitle(null);
                                    setDescription(null);
                                    setCity(null);
                                    setLocation(null);
                                }
                            }
                            } />
                        <DiscardBtn title="Clear" onPress={() => { setBlocks([]); setTitle(null); setDescription(null); setCity(null); setLocation(null); setRerender(true); }} />
                    </View>
                }
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
        color: 'black'
    }, btn: {

    },
    btntxt: {
        color: 'black'
    },
    container: {
        paddingVertical: 10,
        paddingBottom: 85,
    },
    viewButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    description: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginTop: 10,
        width: '96%',
        marginLeft: '2%',
        color: 'black'
    }
})

export default CreateGuide;