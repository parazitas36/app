import { View, StyleSheet, Dimensions, Text, Pressable, Alert, TextInput, Image } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { GetUserResponse } from '../api/GetUserResponse';
import { SendResponse } from '../api/SendResponse';
import { ActivityIndicator } from 'react-native-paper';
import { Context } from '../App';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RatingBlock = (props) => {

    const { accInfo } = React.useContext(Context);
    const [userInfo, setUserInfo] = accInfo;
    const profile_img = "https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg"

    const [stars, setStars] = React.useState([1, 2, 3, 4, 5]);
    const [rating, setRating] = React.useState(0);
    const [userResponse, setUserResponse] = React.useState(null);
    const [isNull, setRatingBool] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [text, setText] = React.useState('')

    React.useLayoutEffect(() => {
        (async () => {
            const userRating = await GetUserResponse(props.userId, props.guideId);
            if (userRating === null) {
                setUserResponse(null);
                setLoading(false)
            } else {
                setUserResponse(userRating);
                setRatingBool(false)
                setRating(userRating['rating'])
                setText(userRating['text'])
                setLoading(false)
            }
        })()
    }, []);

    console.log(userInfo);

    const PublishResponse = async (gid, uid) => {
        if (rating > 0) {
            var res = await SendResponse(gid, uid, text, rating)
            Alert.alert("Successful", "Rating published", [
                { text: "Ok" }
            ]
            )
        } else {
            Alert.alert("Details", "Please select the rating star first", [
                { text: "Ok" }
            ]
            )
        }
    };

    if (loading === true) {
        // Loading... indikatorius
        return (
            <View>
                <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center', marginTop: 50 }} />
            </View>
        )
    } else {
        return (
            <ScrollView>
                <View>
                    <Text style={styles.text}>{!isNull ? "Your rating" : "Rate the guide"}</Text>
                </View>
                    <View style={styles.viewColumn}>
                        <View style={styles.rating}>
                            {stars.map((star) => {
                                return (
                                    <TouchableOpacity >
                                        <Pressable onPress={() => setRating(star)}>
                                            <MaterialIcons name={star <= rating ? 'star' : 'star-border'} size={25} color={'rgb(149, 148, 186)'} />
                                        </Pressable>
                                    </TouchableOpacity>)
                            }
                            )}
                        </View>
                    </View>
                    <View style={styles.view}>
                        <TextInput
                            style={styles.textInput}
                            defaultValue={!isNull ? userResponse['text'] : ''}
                            placeholder={"Enter a comment"}
                            placeholderTextColor="rgba(255, 255, 255, 0.8)"
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={setText}></TextInput>
                    </View>
                    <View style = {styles.btnview}>
                        <TouchableOpacity>
                            <Pressable style={styles.btn} onPress={() => { PublishResponse(props.guideId, props.userId) }}>
                                <Text style={{color: 'rgba(255, 255, 255, .95)', fontSize: 18, fontWeight: '500'}}>{isNull ? "Rate" : "Change"}</Text>
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.spacer}>
                </View>
            </ScrollView>
        )
    }
}

export default RatingBlock

const styles = StyleSheet.create({
    rating: {
        marginLeft: width * 0.05,
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    text: {
        fontSize: 18,
        left: '6%',
        paddingVertical: 2,
        color: 'black',
        fontWeight: '500',
    },
    stars: {
        flexDirection: 'row',
    },
    textInput: {
        marginTop: 10,
        width: '90%',
        backgroundColor: 'rgba(123, 145, 170, 0.6)',
        alignSelf: 'center',
        textAlignVertical: 'top',
        paddingHorizontal: 10,
        color: 'white',
        borderRadius: 5,
        fontSize: 15,
    },
    view: {
        flexDirection: 'column',
        width: '100%',
        borderRadius: 5,
        backgroundColor: 'transparent',
    },
    btn: {
        width: 85,
        height: 35,
        borderWidth: .5,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: 'rgba(149, 148, 186, 1)',
        borderColor: 'rgba(123, 145, 170, 1)',
    },
    btnview: {
        width: 85,
        height: 35,
        borderWidth: .5,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: 'rgba(149, 148, 186, 1)',
        borderColor: 'rgba(123, 145, 170, 1)',
        marginRight: width * 0.05
    },
    userInfo: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center'
    },
    imageView: {
        width: '20%',
        minWidth: 42,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profile_image: {
        width: 40,
        height: 40,
        aspectRatio: 1,
        borderRadius: 180,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, .15)'
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
    view1: {
        width: '90%',
        minHeight: 50,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: 'rgba(123, 145, 170, 0.6)',
        marginBottom: 3,
        paddingBottom: 10,
    },
    viewColumn: {
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    star: {
        flexDirection: 'row'
    },
    spacer: {
        height: 10,
    }
})