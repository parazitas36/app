import { View, StyleSheet, Dimensions, Text, Pressable, Alert, TextInput } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { GetUserResponse } from '../api/GetUserResponse';
import { SendResponse } from '../api/SendResponse';
import { ActivityIndicator } from 'react-native-paper';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RatingBlock = (props) => {

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

    const PublishResponse = async (gid, uid) => {
        if (rating > 0) {
            console.log(gid);
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
                <View style={styles.view}>
                    <TextInput
                        style={styles.textInput}
                        defaultValue={!isNull ? userResponse['text'] : ''}
                        placeholder={"Enter a comment"}
                        placeholderTextColor="rgba(255, 255, 255, 0.8)"
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={setText}></TextInput>
                    <TouchableOpacity>
                        <Pressable style={styles.btn} onPress={() => { PublishResponse(props.guideId, props.userId) }}>
                            <Text style={{color: 'rgba(255, 255, 255, .95)', fontSize: 18, fontWeight: '500'}}>{isNull ? "Rate" : "Change"}</Text>
                        </Pressable>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

export default RatingBlock

const styles = StyleSheet.create({
    rating: {
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
        backgroundColor: 'rgba(123, 145, 170, 0.5)',
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
        borderWidth: 1.2,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: 'rgba(123, 145, 170, 0.95)',
        borderColor: 'rgba(123, 145, 170, 0.95)',
    }
})