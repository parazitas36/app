import React, { createContext, useContext } from 'react'
import {
    Dimensions,
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ImageBackground
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Button, Searchbar } from 'react-native-paper';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import SearchBtn from '../components/buttons/SearchBtn';
import SearchModal from '../components/modals/SearchModal';
import { ConvertBytesToFile } from '../api/ConvertBytesToFile';
// import { ConvertBytesToFile } from '../api/ConvertBytesToFile';
import { GetAllGuides } from '../api/GetAllGuides';
import { GetSearchedGuides } from '../api/GetSearchedGuides';
import { Context } from '../App';
import Card from '../components/Card';

import react from 'react';

import LinearGradient from 'react-native-linear-gradient';

const image = require('../assets/images/background.png');

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        paddingBottom: 75,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'white',
    },
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
        backgroundColor: 'white',
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
})

export const HomeContext = createContext();

const Home = ({ navigation }) => {
    const [guides, setGuides] = React.useState([]);
    const { guideID, accInfo } = React.useContext(Context);
    const [chosenGuideID, setChosenGuideID] = guideID;
    const [refresh, setRefresh] = React.useState(false);
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [userInfo, setUserInfo] = accInfo;
    const [showSearch, setShowSearch] = React.useState(false);
   

    const [getFiltered, setGetFiltered] = React.useState(false)
    const [searchInput, setSearchInput] = React.useState('')
    const [category, setCategory] = React.useState('')

    const value = {
        showSearchs: [showSearch, setShowSearch]
    }

    React.useLayoutEffect(() => {
        (async () => {
            const temp = await GetAllGuides();
            setGuides(temp);
            setRefresh(false);
            setFirstLoad(false);
        })()
    }, [refresh])

    // React.useLayoutEffect(() => {
    //     (async () => {
    //         const temp2 = await GetSearchedGuides(searchInput, category);
    //         if(temp2 === null){
    //             setGuides([]);
    //             setSearchInput('')
    //             setCategory('')
    //             setGetFiltered(false)
    //             setShowSearch(false)
    //         }else{
    //             console.log("ieina")
    //             setGuides(temp2)
    //             setShowSearch(false)
    //             setSearchInput('')
    //             setCategory('')
    //             setGetFiltered(false)
    //         }
    //     })()
    // }, [getFiltered])

    if (firstLoad) {
        return (
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center', marginTop: 50 }} />
            </ImageBackground>
        )
    }

    return (
    <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
        <HomeContext.Provider value={value}>
            <ScrollView
            style={styles.mainView}
            refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={() => setRefresh(true)}
                />
            }
        >
            {/* <View>
                <Searchbar placeholder='Search' onIconPress={() => setShowSearch(true)}/>
            </View> */}
            <View >
                <SearchBtn onPress={() => setShowSearch(true)}></SearchBtn>
            </View>
            

            <SearchModal visible={showSearch}
                    goBack={() => setShowSearch(false)}
                    setFiltered={() => search()}
                    >
            </SearchModal>

            <View style={styles.view}>
                {guides && guides.length > 0 &&
                    guides.map((item) => {
                        if (item) {
                            return <Card
                                uri={item['image']}
                                creatorID={item['creatorId']}
                                creator={item['creatorName'] + " " + item['creatorLastName']}
                                rating={item['rating']}
                                city={item['city']}
                                title={item['title']}
                                description={item['description']}
                                guideID={item['_id']}
                                favorite={userInfo['savedguides'].includes(item['_id'])}
                                savedguides={userInfo['savedguides']}
                                userID={userInfo['_id']}
                                onClick={() => {
                                    setChosenGuideID(item['_id']);
                                    console.log(item['_id'])
                                    navigation.navigate("Guide")
                                }
                                }
                            />
                        }
                    })
                }
            </View>
        </ScrollView>
        </HomeContext.Provider>
        </ImageBackground>
    
    );
}

export default Home;
