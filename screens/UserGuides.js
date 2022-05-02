import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ImageBackground
} from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { GetUserGuides } from '../api/GetUserGuides';
import { Context } from '../App';
import Card from '../components/Card';

const image = require('../assets/images/background.png');

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
    }
})

const UserGuides = ({ navigation }) => {
    const [guides, setGuides] = React.useState([]);
    const { guideID, accInfo } = React.useContext(Context);
    const [chosenGuideID, setChosenGuideID] = guideID;
    const [refresh, setRefresh] = React.useState(false);
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [userInfo, setUserInfo] = accInfo;

    React.useLayoutEffect(() => {
        (async () => {
            const temp = await GetUserGuides(userInfo['_id']);
            setGuides(temp);
            setRefresh(false);
            setFirstLoad(false);
        })()
    }, [refresh])

    if (firstLoad) {
        return (
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center', marginTop: 50 }} />
            </ImageBackground>
        )
    }

    return (
        <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
            <ScrollView
                style={styles.mainView}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => setRefresh(true)}
                    />
                }
            >
                <View style={styles.view}>
                    {guides && guides.length === 0 &&
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'black',
                                marginTop: 30
                            }}
                        >You have not created any guide yet.</Text>
                    }
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
        </ImageBackground>
    );
}

export default UserGuides;
