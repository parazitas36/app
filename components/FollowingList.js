import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { GetFollowing } from '../api/GetFollowing';
import { ActivityIndicator, List } from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Context } from '../App';

const FollowingList = ({ navigation, userID }) => {
    const { creatorInfo } = React.useContext(Context);
    const [chosenProfileID, setChosenProfileID] = creatorInfo;
    const [following, setFollowing] = React.useState(null);

    const NavigateToProfile = (profileID) => {
        setChosenProfileID(profileID)
        navigation.navigate("CreatorProfile")
    }

    React.useLayoutEffect(() => {
        (async () => {
            const results = await GetFollowing(userID)
            setFollowing(results)
        })()

    }, [])

    if (!following) {
        return <View>
            <ActivityIndicator />
        </View>
    }

    return (
        <ScrollView contentContainerStyle={{ width: '96%', alignSelf: 'center', paddingBottom: 100 }}>
            {following.map((item) => {
                return (
                    <TouchableOpacity>
                        <Pressable onPress={() => NavigateToProfile(item['_id'])}>
                            <View style={styles.view}>
                                <View style={styles.imageview}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item['ppicture'] === "" ? "https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg" : item['ppicture'] }}
                                    />
                                </View>
                                <View style={styles.textview}>
                                    <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
                                        {`${item['firstname']} ${item['lastname']}`}
                                    </Text>
                                </View>
                            </View>
                        </Pressable>
                    </TouchableOpacity>)
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(149, 148, 186, .3)',
        borderRadius: 7,
        width: '100%',
        height: 70,
        marginVertical: 5,
    },
    imageview: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 58,
        height: 58,
        borderRadius: 180,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, .2)',
    },
    textview: {
        width: '75%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingRight: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.9)',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowRadius: 5,
        textShadowOffset: {
            width: 3,
            height: 3
        }
    }
})

export default FollowingList;