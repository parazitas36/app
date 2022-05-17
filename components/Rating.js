import { View, StyleSheet, Dimensions, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { GetUserResponse } from '../api/GetUserResponse';
import { SendResponse } from '../api/SendResponse';
import { Button, TextInput } from 'react-native-paper';
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
            if(userRating === null){
                setUserResponse(null);
                setLoading(false)
            }else{
                setUserResponse(userRating);
                setRatingBool(false)
                setRating(userRating['rating'])
                setText(userRating['text'])
                setLoading(false)
            }
        })()
    }, []);
    
    const PublishResponse = async (gid, uid) => {
        if(rating > 0){
            console.log(gid);
            var res = await SendResponse(gid, uid, text, rating)
            Alert.alert("Successful","Rating published",[
                {text: "Ok"}
            ]
            )
        }else{
            Alert.alert("Details","Please select the rating star first",[
                {text: "Ok"}
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
    }else{
        return (
            <ScrollView>
                <View>
                    <Text style={styles.text}>{!isNull? "Your's rating" : "Rate the guide"}</Text>
                </View>
                 <View style={styles.rating}>
                    {stars.map((star) => {
                        return (
                        <TouchableOpacity >
                        <Pressable  onPress = {() => setRating(star)}>
                        <MaterialIcons name={star <= rating ? 'star' : 'star-border'} size={25} color={'gold'}/> 
                        </Pressable>
                        </TouchableOpacity>)
                        }
                    )}
                </View>
                <View style = {styles.view}>
                    <TextInput 
                        style = {styles.textInput} 
                        defaultValue = {!isNull ? userResponse['text'] : ''}
                        placeholder = {"Enter a comment"}
                        multiline = {true}
                        onChangeText = {setText}></TextInput>
                    <TouchableOpacity>
                        <Pressable style = {styles.btn} onPress={() => {PublishResponse(props.guideId, props.userId)}}>
                            <Fontisto name = {'email'} size ={30} color={'black'}></Fontisto>
                        </Pressable>
                    </TouchableOpacity>
                    {/* <Button 
                        color='blue' 
                        style = {styles.btn} 
                        onPress = {() => {PublishResponse(props.guideId, props.userId)}}>Publish
                    </Button> */}
                </View>
            </ScrollView>
          )
    }   
}

export default RatingBlock

const styles = StyleSheet.create({
    rating:{
        width: '90%',
        fontSize: 16,
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    text:{
        fontSize: 17,
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'black',
        fontWeight: '500',
    },
    stars:{
        flexDirection: 'row'
    },
    textInput:{
        marginTop: 10,
        width: width * 0.9,
        textAlign: 'justify',
        padding: 5,
        numberOfLines: 'auto',
    },
    view: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: width,
        borderRadius: 5,
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    btn:{
        width: 85,
        height: 35,
        borderWidth: 1.85,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        borderRadius: 5,
        marginTop: 5,
    }
})