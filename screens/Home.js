import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl
} from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { ConvertBytesToFile } from '../api/ConvertBytesToFile';
import { GetAllGuides } from '../api/GetAllGuides';
import { Context } from '../App';
import Card from '../components/Card';

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

const Home = ({ navigation }) => {
    const [guides, setGuides] = React.useState([]);
    const { guideID } = React.useContext(Context);
    const [chosenGuideID, setChosenGuideID] = guideID;
    const [refresh, setRefresh] = React.useState(false);
    const [firstLoad, setFirstLoad] = React.useState(true);

    React.useLayoutEffect(() => {
        (async () => {
            const temp = await GetAllGuides();
            setGuides(temp);
            setRefresh(false);
            setFirstLoad(false);
        })()
    }, [refresh])

    if (firstLoad) {
        return (
            <View>
                <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center', marginTop: 50 }} />
            </View>
        )
    }

    return (
        <ScrollView
            style={styles.mainView}
            refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={() => setRefresh(true)}
                />
            }
        >
            <View>
                <Searchbar placeholder='Search' />
            </View>
            <View style={styles.view}>
                {guides && guides.length > 0 &&
                    guides.map((item) => {
                        if (item) {
                            return <Card
                                uri={item['image']}
                                creator={item['creatorName'] + " " + item['creatorLastName']}
                                rating={item['rating']}
                                city={item['city']}
                                title={item['title']}
                                description={item['description']}
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
    );
}

export default Home;
