import { View, ScrollView, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Context } from '../App';
import { GetGuideById } from '../api/GetGuideById';
import TextBlock from '../components/blocks/TextBlock';
import ImageBlock from '../components/blocks/ImageBlock';
import { ConvertBytesToFile } from '../api/ConvertBytesToFile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IOnicons from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator } from 'react-native-paper';
import VideoBlock from '../components/blocks/VideoBlock';

const profile_img = "https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg"

const Guide = () => {
    const { guideID } = React.useContext(Context);
    const [chosenGuideID, setChosenGuideID] = guideID;
    const [guideInfo, setGuideInfo] = React.useState(null);

    React.useLayoutEffect(() => {
        (async () => {
            const resp = await GetGuideById(chosenGuideID);
            setGuideInfo(resp);
        })()
    }, [])

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
                <Text numberOfLines={2} ellipsizeMode='tail'  style={styles.title}>{guideInfo['title']}</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.creator}>{"Author: " + author}</Text>
                <View style={styles.profile_image_view}>
                    <Image
                        source={{uri: profile_img}}
                        style={styles.profile_image}
                        resizeMode="cover"
                    />
                </View>

                {/* Prideti i favorites */}
                <View style={styles.guideButtons}>
                    <TouchableOpacity >
                        <Pressable onPress={() => console.log('click')}>
                            <IOnicons name={'heart-outline'} size={36} color={'white'} />
                        </Pressable>
                    </TouchableOpacity>
                </View>

                {/* Lokacija */}
                <View style={[styles.guideButtons, { top: 125, flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                    <IOnicons name='location-outline' color="white" size={30} />
                    <Text style={styles.city}>{guideInfo['city']}</Text>
                </View>

                {/* Reitingas */}
                <View style={[styles.guideButtons, { top: 200 - 35, flex: 1, flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={styles.rating}>Rating: {'-'}/5</Text>
                    <IOnicons name={'star'} size={25} color={'gold'} />
                </View>

                {/* Nuo cia gido vidus */}
                <Text style={styles.texttitle}>{guideInfo['title']}</Text>

                {guideInfo['blocks'].map((data) => {
                    switch (data['type']) {
                        case 'Text':
                            const text = data['tblock']['text'];
                            return <TextBlock styles={styles} text={
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Varius duis at consectetur lorem donec massa sapien. Egestas purus viverra accumsan in nisl nisi scelerisque eu.  Eget arcu dictum varius duis. Sodales neque sodales ut etiam sit amet nisl purus.  Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Facilisi morbi tempus iaculis urna id. Consequat nisl vel pretium lectus quam. Massa tempor nec feugiat nisl pretium fusce. Sit amet risus nullam eget felis eget. Nunc sed blandit libero volutpat sed cras ornare arcu. Odio ut enim blandit volutpat. Congue mauris rhoncus aenean vel. Nunc sed augue lacus viverra vitae congue eu. Semper viverra nam libero justo laoreet sit amet cursus. Risus quis varius quam quisque id diam. Sed turpis tincidunt id aliquet risus feugiat in ante. Non enim praesent elementum facilisis leo vel fringilla est."
                            } />
                        case 'Image':
                            return <ImageBlock styles={styles} data={data} />
                        case 'Video':
                            return <VideoBlock styles={styles} data={data} />
                    }
                })}
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
        paddingHorizontal: 25,
        marginLeft: '5%',
        fontWeight: '00',
        textAlign: 'justify',
        paddingVertical: 5,
    },
    texttitle: {
        textAlign: 'center',
        color: 'black',
        fontSize: 32,
        paddingTop: 15,
        paddingBottom: 10,
        fontWeight: '500'
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    imageview: {
        width: '100%',
    },
    video: {
        width: '100%',
    },
    videoview: {
        width: '100%',
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
        backgroundColor: 'rgba(0, 0, 0, 0.225)',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
    view: {
        width: '100%',
        paddingBottom: 85,
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
        borderColor: 'rgba(0, 0, 0, 0.15)',borderRadius: 180,
    }
})

export default Guide