import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AddBlockBtn from '../components/AddBlockBtn';
import AddTextBlock from '../components/blocks/AddTextBlock';
import Button from '../components/Button';
import CreateBlockModal from '../components/modals/CreateBlockModal';

const CreateGuide = () => {
    const [title, setTitle] = React.useState(null);
    const [showBlock, setShowBlock] = React.useState(false);
    const [text, setText] = React.useState(null);
    const [blocks, setBlocks] = React.useState([]);

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
                return <Text>{blk}</Text>
            })}
            <AddBlockBtn onPress={() => setShowBlock(true)} />
        </View>
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