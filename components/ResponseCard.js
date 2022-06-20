import { View, StyleSheet, Dimensions, Text, Pressable, Alert, Image } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Button, TextInput } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';
import { GetNotUserResponses } from '../api/GetNotUserResponses';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const profile_img = "https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg"

const ResponseCard = (props) => {
    const [loading, setLoading] = React.useState(true);
    const [responses, setResponses] = React.useState(null)

    React.useLayoutEffect(() => {
        (async () => {
            const resp2 = await GetNotUserResponses(props.userId, props.guideId)
            setResponses(resp2)
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return (
            <View>
                <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center', marginTop: 50 }} />
            </View>
        )
    } else if (!loading && responses === null) {
        return (
            <View>
            </View>
        )
    } else {
        return (
            <ScrollView contentContainerStyle={{paddingBottom: 10}}>
                <Text style={styles.textTitle}>{`Users reviews (${responses.length})`}</Text>
                {responses.map((data) => {
                    const stars = [];
                    for (var i = 0; i < data['rating']; i++) {
                        stars.push(i + 1);
                    }
                    return (
                        <View style={styles.view}>
                            <View style={styles.userInfo}>
                                <View style={styles.imageView}>
                                    <Image
                                        source={{ uri: data['ppicture']? data['ppicture'] : profile_img }}
                                        style={styles.profile_image}
                                        resizeMode="cover"
                                    />
                                </View>

                                <View style={styles.viewColumn}>
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.creatorName}>
                                        {`${data['firstName']} ${data['lastName']}`}
                                    </Text>
                                    <View style={styles.star}>
                                        {stars.map((star) => {
                                            return (
                                                <MaterialIcons name={'star'} size={25} color={'rgb(149, 148, 186)'} />
                                            )
                                        }
                                        )}
                                    </View >
                                </View>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.text}>{data['text']}</Text>
                            </View>
                        </View>
                    )
                }
                )}
            </ScrollView>
        )
    }
}

export default ResponseCard

const styles = StyleSheet.create({
    view: {
        width: '90%',
        minHeight: 50,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(123, 145, 170, 0.6)',
        marginBottom: 15,
    },
    userInfo: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center'
    },
    viewColumn: {
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    star: {
        flexDirection: 'row'
    },
    creatorName: {
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 3,
        paddingVertical: 2,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {
            width: 1.75,
            height: 1.5
        },
        textShadowRadius: 5
    },
    profile_image: {
        width: 40,
        height: 40,
        aspectRatio: 1,
        borderRadius: 180,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, .15)'
    },
    textTitle: {
        color: 'black',
        fontSize: 18,
        marginLeft: '6%',
        fontWeight: '500',
        paddingVertical: 8
    },
    imageView: {
        width: '20%',
        minWidth: 42,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textView: {
        width: '100%',
        padding: 5,
        paddingHorizontal: 15,
        paddingBottom: 12,
        alignSelf: 'center'
    },
    text : {
        left: 0,
        position: 'relative',
        color: 'rgba(255, 255, 255, .99)',
        fontWeight: '400',
        textAlign: 'justify',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, .3)',
        paddingTop: 5,
        paddingHorizontal: 3,
        fontSize: 14
    }
})