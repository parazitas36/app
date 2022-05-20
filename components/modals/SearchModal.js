import React from 'react'
import { Dimensions, StyleSheet, ScrollView, Modal, Text, Image, View, ImageBackground } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import Button from '../Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { GetSearchedGuides } from '../../api/GetSearchedGuides';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const image = require('../../assets/images/background.png');

const styles = StyleSheet.create({
    buttonPicture: {
        width: 50,
        height: 50,
        marginLeft: 5,
        backgroundColor: 'white'
    },
    viewButton: {
        flexDirection: 'row',
        width: width * 0.45,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#f4f5f5',
        marginLeft: width * 0.035,
        marginTop: width * 0.025,
    },
    viewButtonPressed: {
        flexDirection: 'row',
        width: width * 0.45,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#d4d4d4',
        marginLeft: width * 0.035,
        marginTop: width * 0.025,
    },
    viewTwoButtonsRow: {
        flexDirection: 'row',
    },
    viewOneButtonsRow: {
        alignItems: 'center',
    },
    textVieButton: {
        fontSize: 15,
        textAlign: 'center',
        width: width * 0.25,
        flexDirection: 'row',
        color: 'black',
    }
});

const backBtnStyle = StyleSheet.create({
    btntxt: {
        fontSize: 16,
        color: "black",
        textAlign: 'center',
    },
    btn: {
        marginTop: 15,
        width: width * 0.3,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        paddingHorizontal: 10
    },
    view: {
        alignItems: 'center',
    }
});

const SearchModal = (props) => {
    const [category, setCategory] = React.useState('');
    const [name, setName] = React.useState('')
    const [pressed, setPressed] = React.useState([false, false, false, false, false, false])
    const [filteredGuides, setFilteredGuides] = props.filteredData;

    const Filter = async () => {
        const resp = await GetSearchedGuides(name, category);
        return resp;
    }

    return (
        <Modal animationType='slide' visible={props.visible}>
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
            <ScrollView>
                <View>
                    <Searchbar
                        placeholder='Search'
                        onChangeText={setName}
                        value={name}
                        onIconPress={async() => {
                            const resp = await Filter();
                            console.log(resp);
                            setFilteredGuides(resp);
                            props.goBack();
                        }}
                    />
                </View>
                <View style={styles.viewTwoButtonsRow}>
                    <TouchableOpacity>
                        <Pressable onPress={
                            () => {
                                setPressed([true, false, false, false, false, false]);
                                setCategory('Museums');

                            }}>
                            <View style={pressed[0] ? styles.viewButtonPressed : styles.viewButton}>
                                <Text style={styles.textVieButton}>Museums</Text>
                                <Image style={styles.buttonPicture} source={require('../../assets/images/Dzeus.jpg')} />
                            </View>
                        </Pressable>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Pressable onPress={() => {
                            setPressed([false, true, false, false, false, false]);
                            setCategory('Ancient Buildings');
                        }}>
                            <View style={pressed[1] ? styles.viewButtonPressed : styles.viewButton}>
                                <Text style={styles.textVieButton} >Ancient Buildings</Text>
                                <Image style={styles.buttonPicture} source={require('../../assets/images/koliziejus.png')} />
                            </View>
                        </Pressable>
                    </TouchableOpacity>
                </View>

                <View style={styles.viewTwoButtonsRow}>
                    <TouchableOpacity>
                        <Pressable onPress={() => {
                            setPressed([false, false, true, false, false, false]);
                            setCategory('Art Galleries');
                        }}>
                            <View style={pressed[2] ? styles.viewButtonPressed : styles.viewButton}>
                                <Text style={styles.textVieButton}>Art Galleries</Text>
                                <Image style={styles.buttonPicture} source={require('../../assets/images/Art.jpg')} />
                            </View>
                        </Pressable>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Pressable onPress={() => {
                            setPressed([false, false, false, true, false, false]);
                            setCategory('Nature Walks');
                        }}>
                            <View style={pressed[3] ? styles.viewButtonPressed : styles.viewButton}>
                                <Text style={styles.textVieButton} >Nature Walks</Text>
                                <Image style={styles.buttonPicture} source={require('../../assets/images/tree.jpg')} />
                            </View>
                        </Pressable>
                    </TouchableOpacity>
                </View>

                <View style={styles.viewTwoButtonsRow}>
                    <TouchableOpacity>
                        <Pressable onPress={() => {
                            setPressed([false, false, false, false, true, false]);
                            setCategory('Zoos');
                        }}>
                            <View style={pressed[4] ? styles.viewButtonPressed : styles.viewButton}>
                                <Text style={styles.textVieButton}>Zoos</Text>
                                <Image style={styles.buttonPicture} source={require('../../assets/images/Lion.png')} />
                            </View>
                        </Pressable>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Pressable onPress={() => {
                            setPressed([false, false, false, false, false, true]);
                            setCategory('Zoos');
                        }}>
                            <View style={pressed[5] ? styles.viewButtonPressed : styles.viewButton}>
                                <Text style={styles.textVieButton}>Other</Text>
                                <Image style={styles.buttonPicture} source={require('../../assets/images/other.png')} />
                            </View>
                        </Pressable>
                    </TouchableOpacity>
                </View>

                <View style={backBtnStyle.view}>
                    <Button styles={backBtnStyle} title={'Return'} onPress={props.goBack} />
                </View>

            </ScrollView>
            </ImageBackground>
        </Modal>
    )
}

export default SearchModal;