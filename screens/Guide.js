import { View, ScrollView, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Context } from '../App';
import { GetGuideById } from '../api/GetGuideById';
import TextBlock from '../components/blocks/TextBlock';
import ImageBlock from '../components/blocks/ImageBlock';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IOnicons from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator } from 'react-native-paper';
import VideoBlock from '../components/blocks/VideoBlock';
import Rating from '../components/Rating';
import ResponseCard from '../components/ResponseCard';
import MapView, { Marker } from 'react-native-maps';
import { UnsaveGuide } from '../api/UnsaveGuide';
import { SaveGuide } from '../api/SaveGuide';
import { GetCreator } from '../api/GetCreator'

const profile_img = "https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg"
const tempText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius duis at consectetur lorem donec massa sapien. Egestas purus viverra accumsan in nisl nisi scelerisque eu.  Eget arcu dictum varius duis. Sodales neque sodales ut etiam sit amet nisl purus.  Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Facilisi morbi tempus iaculis urna id. Consequat nisl vel pretium lectus quam. Massa tempor nec feugiat nisl pretium fusce. Sit amet risus nullam eget felis eget. Nunc sed blandit libero volutpat sed cras ornare arcu. Odio ut enim blandit volutpat. Congue mauris rhoncus aenean vel. Nunc sed augue lacus viverra vitae congue eu. Semper viverra nam libero justo laoreet sit amet cursus. Risus quis varius quam quisque id diam. Sed turpis tincidunt id aliquet risus feugiat in ante. Non enim praesent elementum facilisis leo vel fringilla est."

const Guide = ({ navigation }) => {
    const { guideID, creatorInfo, accInfo } = React.useContext(Context);
    const [userInfo, setUserInfo] = accInfo;
    const [chosenGuideID, setChosenGuideID] = guideID;
    const [guideInfo, setGuideInfo] = React.useState(null);
    const [chosenProfileID, setChosenProfileID] = creatorInfo;
    const [isRatingZero, setIfZero] = React.useState(true);
    const [favorite, setFavorite] = React.useState(userInfo['savedguides'].includes(chosenGuideID))
    const [profileImage, setProfileImage] = React.useState(null)
    const [profileData, setProfileData] = React.useState(null);

    React.useLayoutEffect(() => {
        (async () => {
            const resp = await GetGuideById(chosenGuideID);
            setGuideInfo(resp);
            if (resp['rating'] !== 0) {
                setIfZero(false);
            }
            const resp2 = await GetCreator(resp['creatorId']);
            const json = await resp2.json();
            setProfileData(json);
            if(json['ppicture'] === "" || json['ppicture'] === null){
                setProfileImage("https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg")
            }else{
                setProfileImage(json['ppicture']);
            }
            console.log(json);
        })()
    }, [])

    const changeFavorite = async () => {
        if (favorite) {
            const resp = await UnsaveGuide(chosenGuideID, userInfo["_id"]);
            if (resp.status === 200) {
                const json = await resp.json();
                setUserInfo(json);
                setFavorite(false)
            }
        } else {
            const resp = await SaveGuide(chosenGuideID, userInfo["_id"]);
            if (resp.status === 200) {
                const json = await resp.json();
                setUserInfo(json);
                setFavorite(true)
            }
        }
    }

    if (!guideInfo) {
        // Loading... indikatorius
        return (
            <View>
                <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center', marginTop: 50 }} />
            </View>
        )
    } else {
        // Paima pirma nuotrauka kaip pagrindine foto
        let headerImageURI = null;
        for (let i = 0; i < guideInfo['blocks'].length; i++) {
            let imageInfo = guideInfo['blocks'][i];
            if (imageInfo['type'] === "Image") {
                headerImageURI = imageInfo['pblock']['uri']
                break;
            }
        }
        const author = guideInfo['creatorName'] + " " + guideInfo['creatorLastName'];
        return (
            <ScrollView contentContainerStyle={styles.view}>
                {/* Pagrindines foto vaizdas */}
                <View style={styles.headerview}>
                    <Image style={styles.headerimage} source={{ uri: headerImageURI }} />
                </View>
                {/* Pagrindines foto vaizdo uztamsinimas */}
                <View style={styles.headeroverflow} />

                {/* Apacioj gido duomenu atvaizdavimas ant pagrindines foto */}
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>{guideInfo['title']}</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.creator}>{"Author: " + author}</Text>

                <View style={styles.profile_image_view}>
                    <TouchableOpacity>
                        <Pressable
                            onPress={() => {
                                setChosenProfileID(guideInfo['creatorId'])
                                navigation.navigate("CreatorProfile")
                            }}
                        >
                            <Image
                                source={{ uri: profileImage }}
                                style={styles.profile_image}
                                resizeMode="cover"
                            />
                        </Pressable>
                    </TouchableOpacity>
                </View>

                {/* Prideti i favorites */}
                <View style={styles.guideButtons}>
                    <TouchableOpacity >
                        <Pressable onPress={changeFavorite}>
                            <IOnicons name={favorite ? 'heart' : 'heart-outline'} size={36} color={favorite ? "rgba(255, 30, 90, .85)" : 'white'} />
                        </Pressable>
                    </TouchableOpacity>
                </View>

                {/* Lokacija */}
                <View style={[styles.guideButtons, { top: 125, flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                    <IOnicons name='location-outline' color="white" size={30} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.city}>{guideInfo['city']}</Text>
                </View>

                {/* Reitingas */}
                <View style={[styles.guideButtons, { top: 200 - 35, flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={styles.rating}>Rating: {isRatingZero ? "-" : guideInfo['rating']}/5</Text>
                    <IOnicons name={'star'} size={25} color={'rgb(149, 148, 186)'} />
                </View>

                {/* Nuo cia gido vidus */}
                <Text style={styles.texttitle}>{guideInfo['title']}</Text>

                {guideInfo['blocks'].map((data) => {
                    switch (data['type']) {
                        case 'Text':
                            const text = data['tblock']['text'];
                            return <TextBlock styles={styles} text={
                                data['tblock']['text']
                            } />
                        case 'Image':
                            return <ImageBlock styles={styles} data={data} />
                        case 'Video':
                            return <VideoBlock styles={styles} data={data} />
                    }
                })}

                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>
                        Location
                    </Text>
                </View>

                <MapView
                    style={{
                        height: 250,
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 20
                    }}
                    initialRegion={{
                        latitude: guideInfo['latitude'],
                        longitude: guideInfo['longtitude'],
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        title={guideInfo['title']}
                        coordinate={{
                            latitude: guideInfo['latitude'],
                            longitude: guideInfo['longtitude']
                        }}
                        pinColor='red'
                    >
                    </Marker>
                </MapView>

                <View style={styles.headerTextView}>
                    <Text style={styles.headerText}>
                        Reviews
                    </Text>
                </View>

                <Rating styles={styles} userId={userInfo['_id']} guideId={guideInfo['_id']} />
                <ResponseCard userId={userInfo['_id']} guideId={guideInfo['_id']}></ResponseCard>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textview: {
        width: "100%",
    },
    text: {
        fontSize: 16,
        width: '90%',
        color: 'black',
        paddingHorizontal: 20,
        marginLeft: '5%',
        fontWeight: '00',
        textAlign: 'justify',
        paddingVertical: 5,
    },
    texttitle: {
        textAlign: 'left',
        color: 'black',
        fontSize: 32,
        paddingTop: 15,
        paddingBottom: 10,
        fontWeight: '500',
        maxWidth: '90%',
        alignSelf: 'center'
    },
    image: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 3,
    },
    imageview: {
        width: '90%',
        margin: 0,
        marginLeft: '5%',
        paddingHorizontal: 20,
        marginVertical: 3,
    },
    video: {
        width: '100%',
    },
    videoview: {
        marginTop: 10,
        width: '87%',
        alignSelf: 'center',
    },
    headerimage: {
        width: '100%',
        aspectRatio: 1,
    },
    headerview: {
        flex: 1,
        height: 200,
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
    headeroverflow: {
        position: 'absolute',
        height: 200,
        width: '100%',
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
    view: {
        width: '100%',
        paddingBottom: 85,
        backgroundColor: 'rgb(243, 246, 251)'
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: '500',
        position: 'absolute',
        top: 10,
        left: 15,
        width: '70%',
        height: '20%',
        overflow: 'hidden',
        textShadowColor: 'black',
        textShadowRadius: 15,
        textShadowOffset: { height: -2, width: 2 },
        paddingHorizontal: 1,
    },
    creator: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        position: 'absolute',
        top: 200 - 30,
        left: 10,
        width: '60%',
        height: 50,
        overflow: 'hidden',
        textShadowColor: 'black',
        textShadowRadius: 15,
        textShadowOffset: { height: -2, width: 2 },
    },
    guideButtons: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    city: {
        fontSize: 16,
        color: 'white',
        marginLeft: 3,
        marginRight: 3,
        fontWeight: '500',
        textShadowColor: 'black',
        textShadowRadius: 15,
        textShadowOffset: { height: -2, width: 2 }
    },
    rating: {
        fontSize: 16,
        color: 'white',
        marginRight: 8,
        fontWeight: '500',
        textShadowColor: 'black',
        textShadowRadius: 15,
        textShadowOffset: { height: -2, width: 2 }
    },
    profile_image_view: {
        height: 36,
        width: 36,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)',
        borderRadius: 90,
        position: 'absolute',
        top: 130,
        left: 10,

    },
    profile_image: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)', borderRadius: 180,
    },
    headerTextView:{
        marginTop: 10, 
        marginBottom: 5, 
        alignSelf: 'center',
    },
    headerText: {
        color: 'black', 
        fontSize: 28, 
        fontWeight: '500', 
        textDecorationLine: 'underline', 
        textDecorationStyle: "double",
    },
})

export default Guide