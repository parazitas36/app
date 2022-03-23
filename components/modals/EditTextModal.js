import { ScrollView, TextInput, Modal, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { CreateGuideContext } from '../../screens/CreateGuide'
import Button from '../Button'


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
                <ScrollView>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={10}
                        onChangeText={setText}
                        defaultValue={blocks[editID].object}
                        placeholder="Enter your text"
                    />
                    <Button
                        title='Accept'
                        styles={styles}
                        onPress={() => {
                            if (text === null) { return; }
                            else {
                                blocks[editID].object = text;
                                setShowEditText(false);
                            }
                        }
                        }
                    />
                    <Button
                        title='Return'
                        styles={styles}
                        onPress={() => { setShowEditText(false); }}
                    />
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
    }
})

export default EditTextModal