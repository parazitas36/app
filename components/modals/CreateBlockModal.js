import React from 'react'
import { Dimensions, StyleSheet, View, Modal } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import AddTextBlock from '../blocks/AddTextBlock';
import Button from '../Button';
import PhotoBlockBtn from '../PhotoBlockBtn';
import TextBlockBtn from '../TextBlockBtn';
import VideoBlockBtn from '../VideoBlockBtn';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    btn: {
        width: windowWidth * .2,
        alignItems: 'center',
        alignContent: 'center'
    },
    btntxt: {
        textAlign: 'center'
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
        marginBottom: 100
    }
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

    return (
        <Modal animationType='slide' visible={props.visible}>
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
                <View>
                    <AddTextBlock
                        styles={styles}
                        onChangeText={props.onChangeText}
                        onPress={props.onPress}
                        resetChosen={setChosenBlock}
                    />
                </View>
            }
        </Modal>
    )
}

export default CreateBlockModal;