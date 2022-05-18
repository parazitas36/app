import { ScrollView, TextInput, Modal, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { EditGuideContext } from '../../../screens/EditGuide';
import Button from '../../Button';
import AgreeBtn from '../../buttons/AgreeBtn';
import DiscardBtn from '../../buttons/DiscardBtn';

const EditTextModal = (props) => {
    const { texts, blocks_arr, showBlocks, blockids, editText, editId } = useContext(EditGuideContext);

    const [blocks, setBlocks] = blocks_arr;
    const [showBlock, setShowBlock] = showBlocks;
    const [text, setText] = texts;
    const [block_id, setBlockID] = blockids;
    const [showEditText, setShowEditText] = editText;
    const [editID, setEditID] = editId;

    if (showEditText) {
        return (
            <Modal animationType='slide' visible={showEditText}>
                <ScrollView>
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
                        <AgreeBtn
                            onPress={() => {
                                if (text === null || text === "") { alert('No text has been entered!'); return; }
                                else {
                                    blocks[editID].object = text;
                                    setShowEditText(false);
                                }
                            }}
                        />
                        <DiscardBtn
                            onPress={() => { setShowEditText(false); }}
                        />
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
    viewButtons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center'
    },
})

export default EditTextModal