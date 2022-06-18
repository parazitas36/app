import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../App'
import { GetCreator } from '../api/GetCreator'
import { ActivityIndicator } from 'react-native-paper'
import Button from '../components/Button'
import { Unfollow } from '../api/Unfollow';
import { Follow } from '../api/Follow';
import { GetCreatorGuides } from '../api/GetCreatorGuides'
import Card from '../components/Card'

const profile_img = "https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg"

const CreatorProfile = ({ navigation }) => {
    const { creatorInfo, accInfo, guideID } = useContext(Context);
    const [chosenGuideID, setChosenGuideID] = guideID
    const [chosenProfileID, setChosenProfileID] = creatorInfo;
    const [profileData, setProfileData] = React.useState(null);
    const [userInfo, setUserInfo] = accInfo;
    const [update, setUpdate] = React.useState(false);
    const [profileImage, setProfileImage] = React.useState("")
    const [creatorGuides, setCreatorGuides] = React.useState(null);

    React.useLayoutEffect(() => {
        (async () => {
            const resp = await GetCreator(chosenProfileID);
            const json = await resp.json();
            setUpdate(false);
            setProfileData(json);
            if (json['ppicture'] === "" || json['ppicture'] === null) {
                setProfileImage("https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg")
            } else {
                setProfileImage(json['ppicture']);
            }
        })()
    }, [update])

    React.useEffect(() => {
        (async () => {
            const resp = await GetCreatorGuides(chosenProfileID)
            setCreatorGuides(resp)
        })()
    }, [])

    if (!profileData) {
        return <ActivityIndicator />
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/images/background.png')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <ScrollView contentContainerStyle={styles.view}>
                    <View style={styles.image_view}>
                        <Image style={styles.image} source={{ uri: profileImage }} />
                        <Text ellipsizeMode='tail' numberOfLines={2} style={{ color: 'black', fontWeight: '500', marginTop: 25, fontSize: 26, textAlign: 'center' }}>{profileData['firstname']} {profileData['lastname']}</Text>
                        <Button title={userInfo['followed'].includes(chosenProfileID) ? "unfollow" : "follow"} styles={styles}
                            onPress={async () => {
                                if (userInfo['followed'].includes(chosenProfileID)) {
                                    const resp = await Unfollow(chosenProfileID, userInfo['_id']);
                                    for (let i = 0; i < userInfo['followed'].length; i++) {
                                        if (userInfo['followed'][i] === chosenProfileID) {
                                            for (let j = i; j < userInfo['followed'].length - 1; j++) {
                                                userInfo['followed'][j] = userInfo['followed'][j + 1];
                                            }
                                            userInfo['followed'].pop();
                                            break;
                                        }
                                    }
                                    console.log(resp);
                                    setUpdate(true);
                                } else {
                                    const resp = await Follow(chosenProfileID, userInfo['_id']);
                                    console.log(resp);
                                    userInfo['followed'].push(chosenProfileID);
                                    setUpdate(true);
                                }
                            }}
                        />
                    </View>
                    <View style={styles.stats_view}>
                        <View style={styles.followers}>
                            <Text style={styles.txt}>Followers</Text>
                            <Text style={styles.txt}>{profileData['followers'].length}</Text>
                        </View>
                        <View style={styles.following}>
                            <Text style={styles.txt}>Following</Text>
                            <Text style={styles.txt}>{profileData['followed'].length}</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={styles.userGuidesTitle}>Created Guides</Text>
                    </View>

                    {!creatorGuides &&
                        <View>
                            <ActivityIndicator />
                        </View>}

                    {creatorGuides && creatorGuides.length === 0 &&
                        <View style={{paddingVertical: 15}}>
                            <Text style={{fontSize: 18, fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)'}}>
                                User did not create any guides yet.
                            </Text>
                        </View>}

                    {creatorGuides && creatorGuides.length > 0 &&
                        <ScrollView horizontal>
                            {creatorGuides.map((item) => {
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
                            })}
                        </ScrollView>}

                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 85,
    },
    image_view: {
        marginTop: 50,
        width: 180,
        marginBottom: 30,
    },
    image: {
        aspectRatio: 1,
        width: 180,
        borderRadius: 180,
        borderWidth: 3,
        borderColor: 'rgba(0, 0, 0, 0.125)',
    },
    stats_view: {
        flexDirection: 'row',
        marginBottom: 30,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        borderRadius: 15,
    },
    followers: {
        paddingRight: 10,
        width: '50%',
    },
    following: {
        borderLeftColor: 'rgba(255, 255, 255, 0.5)',
        borderLeftWidth: 2,
        paddingLeft: 10,
        width: '50%',
    },
    txt: {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.85)',
        fontWeight: '500',
        fontSize: 16
    },
    btn: {
        width: 100,
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 12,
        borderWidth: 0.75,
        alignSelf: 'center',
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btntxt: {
        fontSize: 19,
        color: 'black',
        fontWeight: '500',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    userGuidesTitle: {
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, .75)',
        textShadowOffset: {
            width: 3,
            height: 2
        },
        textShadowRadius: 15,
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        width: 220,
        marginBottom: 10,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 5
    }
});

export default CreatorProfile