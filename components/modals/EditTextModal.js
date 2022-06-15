import { ScrollView, TextInput, Modal, StyleSheet, View, ImageBackground, Text } from 'react-native';
import React, { useContext } from 'react';
import { CreateGuideContext } from '../../screens/CreateGuide';
import Button from '../Button';
import AgreeBtn from '../buttons/AgreeBtn';
import DiscardBtn from '../buttons/DiscardBtn';

const EditTextModal = (props) => {
    const { texts, blocks_arr, showBlocks, blockids, editText, editId } = useContext(CreateGuideContext);

    const [blocks, setBlocks] = blocks_arr;
    const [showBlock, setShowBlock] = showBlocks;
    const [text, setText] = texts;
    const [block_id, setBlockID] = blockids;
    const [showEditText, setShowEditText] = editText;
    const [editID, setEditID] = editId;

    if (showEditText) {
        return (
            <Modal animationType='slide' visible={showEditText}>
                <View style={{ flex: 1 }}>
                    <ImageBackground source={require('../../assets/images/background.png')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                            <Text style={styles.title}>Text Block</Text>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={setText}
                                defaultValue={blocks[editID].object}
                                placeholder="Enter your text"
                                placeholderTextColor={'grey'}
                            />
                            <View style={styles.viewButtons}>
                                {props.text !== null && props.text !== "" && <AgreeBtn
                                    onPress={() => {
                                        if (text === null || text === "") { alert('No text has been entered!'); return; }
                                        else {
                                            blocks[editID].object = text;
                                            setShowEditText(false);
                                        }
                                    }}
                                    title="Save"
                                />}
                                <DiscardBtn
                                    onPress={() => { setShowEditText(false); }}
                                />
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
        marginTop: 5,
        textAlignVertical: 'top',
        borderWidth: 1.15,
        margin: 2,
        borderRadius: 5,
        color: 'black',
        width: '98%',
        alignSelf: 'center',
        paddingHorizontal: 12,
        fontSize: 15,
    },
    viewButtons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center'
    },
    title: {
      fontSize: 28,
      color: 'black',
      fontWeight: '500',
      textAlign: 'center',
      marginTop: 10,
      paddingVertical: 10,
      marginBottom: 5,
    }
})

export default EditTextModal