import React, { useContext } from 'react'
import { Dimensions, StyleSheet, ScrollView, Modal, Text, Image, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { HomeContext } from '../../screens/Home';
import AddPhotoBlock from '../blocks/AddPhotoBlock';
import AddTextBlock from '../blocks/AddTextBlock';
import AddVideoBlock from '../blocks/AddVideoBlock';
import Button from '../Button';
import PhotoBlockBtn from '../buttons/PhotoBlockBtn';
import TextBlockBtn from '../buttons/TextBlockBtn';
import VideoBlockBtn from '../buttons/VideoBlockBtn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    buttonPicture:{
        width: 50,
        height: 50,
        marginLeft: 5,
        backgroundColor: 'white'
    },
    viewButton:{
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
    viewButtonPressed:{
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
    viewTwoButtonsRow:{
        flexDirection: 'row',
    },
    viewOneButtonsRow:{
        alignItems: 'center',
    },
    textVieButton:{
        fontSize: 15,
        textAlign: 'center',
        width: width * 0.25,
        flexDirection: 'row'
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
    view:{
        alignItems: 'center',
    }
});

const SearchModal = (props) => {
    const { showSearchs } = useContext(HomeContext);
    const [category, setCategory] = React.useState('');
    const [name, setName] = React.useState('')
    const [showSearch, setShowSearch] = showSearchs;
    const [pressed, setPressed] = React.useState([false, false, false, false, false])
    const [pressedM, setMPressed] = React.useState(false)

    const onChangeSearch = query => setName(query);

    const setAll = (id, categoryName) => {
        for(var i = 0; i < pressed.length; i++){
            if(id === i){
                setPressed(true)
                console.log('ieina')
                setCategory(categoryName)
            }else{
                setPressed(false)
            }
        }
    };

    console.log(name);
    console.log(category);
    console.log(pressed[0]);

    return (
        <Modal animationType='slide' visible={showSearch}>
                <ScrollView>
                    <View>
                        <Searchbar placeholder='Search' onChangeText={onChangeSearch} value={name} onIconPress={props.setFiltered}/>
                        {/* <Searchbar placeholder='Search' onIconPress={}/> */}
                    </View>
                    <View style={styles.viewTwoButtonsRow}>
                        <TouchableOpacity>
                            <Pressable onPress={() => {setPressed([true, false, false, false, false])}}>
                                <View style={pressed[0]? styles.viewButtonPressed : styles.viewButton}>
                                    <Text style={styles.textVieButton}>Museums</Text>
                                    <Image style={styles.buttonPicture} source={require('../../assets/Dzeus.jpg')}/>
                                </View>
                            </Pressable>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Pressable onPress={() => {setPressed([false, true, false, false, false])}}>
                                <View style={pressed[1]? styles.viewButtonPressed : styles.viewButton}>
                                    <Text style={styles.textVieButton} >Ancient Buildings</Text>
                                    <Image style={styles.buttonPicture} source={require('../../assets/koliziejus.png')}/>
                                </View>
                            </Pressable>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewTwoButtonsRow}>
                        <TouchableOpacity>
                            <Pressable onPress={() => {setPressed([false, false, true, false, false])}}>
                                <View style={pressed[2]? styles.viewButtonPressed : styles.viewButton}>
                                    <Text style={styles.textVieButton}>Art Galleries</Text>
                                    <Image style={styles.buttonPicture} source={require('../../assets/Art.jpg')}/>
                                </View>
                            </Pressable>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Pressable onPress={() => {setPressed([false, false, false, true, false])}}>
                                <View style={pressed[3]? styles.viewButtonPressed : styles.viewButton}>
                                    <Text style={styles.textVieButton} >Nature Walks</Text>
                                    <Image style={styles.buttonPicture} source={require('../../assets/tree.jpg')}/>
                                </View>
                            </Pressable>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewOneButtonsRow}>
                        <TouchableOpacity>
                            <Pressable onPress={() => {setPressed([false, false, false, false, true])}}>
                                <View style={pressed[4]? styles.viewButtonPressed : styles.viewButton}>
                                    <Text style={styles.textVieButton}>Zoos</Text>
                                    <Image style={styles.buttonPicture} source={require('../../assets/Lion.png')}/>
                                </View>
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                    <View style={backBtnStyle.view}>
                        <Button styles={backBtnStyle} title={'Return'} onPress={props.goBack} />
                    </View>
                    
                </ScrollView>
                
        </Modal>
    )
}

export default SearchModal;