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
import { ActivityIndicator } from 'react-native-paper';
import SearchBtn from '../components/buttons/SearchBtn';
import SearchModal from '../components/modals/SearchModal';
import { GetAllGuides } from '../api/GetAllGuides';
import { GetSearchedGuides } from '../api/GetSearchedGuides';
import { Context } from '../App';
import Card from '../components/Card';
import * as React from 'react'

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
        backgroundColor: 'white',
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
        flexDirection: 'row'
    }
})

const Home = ({ navigation }) => {
    const [guides, setGuides] = React.useState([]);
    const { guideID, accInfo } = React.useContext(Context);
    const [chosenGuideID, setChosenGuideID] = guideID;
    const [refresh, setRefresh] = React.useState(false);
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [userInfo, setUserInfo] = accInfo;
    const [showSearch, setShowSearch] = React.useState(false);


    const [filteredGuides, setFilteredGuides] = React.useState(null)

    React.useLayoutEffect(() => {
        (async () => {
            const temp = await GetAllGuides();
            setGuides([]);
            setGuides(temp);
            setRefresh(false);
            setFirstLoad(false);
        })()
    }, [refresh, userInfo])

    if (firstLoad) {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                    <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center', marginTop: 50 }} />
                </ImageBackground>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <ScrollView
                    style={styles.mainView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={() => { setFilteredGuides(null); setRefresh(true); }}
                        />
                    }
                >

                    <View style={{ alignSelf: 'center', marginBottom: -5 }}>
                        <SearchBtn onPress={() => setShowSearch(true)}></SearchBtn>
                    </View>


                    <SearchModal visible={showSearch}
                        goBack={() => setShowSearch(false)}
                        filteredData={[filteredGuides, setFilteredGuides]}
                    />

                    <View style={styles.view}>
                        {!filteredGuides && guides && guides.length > 0 &&
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
                                        price={item['price']}
                                        favorite={userInfo['savedguides'].includes(item['_id'])}
                                        savedguides={userInfo['savedguides']}
                                        payedguides={userInfo['payedguides']}
                                        userID={userInfo['_id']}
                                        navigation={navigation}
                                        setChosenGuideID={setChosenGuideID}
                                    />
                                }
                            })
                        }
                        {filteredGuides && filteredGuides.length === 0 &&
                            <View>
                                <Text style={{ color: 'black' }}>No guides were found.</Text>
                            </View>
                        }
                        {filteredGuides &&
                            filteredGuides.length > 0 &&
                            filteredGuides.map((item) => {
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
            </ImageBackground>
        </View>
    );
}

export default Home;
