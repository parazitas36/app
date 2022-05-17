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

    const Print = () =>{
        console.log(responses)
    };
    if (loading) {
        return (
            <View>
                <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center', marginTop: 50 }} />
            </View>
        )
    }else if(!loading && responses === null){
        return(
            <View>
            </View>
        )
    }else{
        return(
            <ScrollView >
                <Text style={styles.textTitle}>Users ratings</Text>
                {responses.map((data) => {
                    const stars = [];
                    for(var i = 0; i < data['rating']; i++){
                        stars.push(i+1);
                    }
                    return<View style = {styles.view}>
                        <View style = {styles.viewRating}>
                            <Image
                                source={{ uri: profile_img }}
                                style={styles.profile_image}
                                resizeMode="cover"
                            />
                            <View style = {styles.viewColumn}>
                                <View style = {styles.star}>
                                    {stars.map((star) => {
                                        return (
                                        <MaterialIcons name={'star'} size={25} color={'gold'}/> 
                                        )}
                                    )}
                                </View >
                                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.creator}>
                                    {'By: ' + data['firstName'] + " " + data['lastName']}
                                </Text>
                            </View>
                        </View> 
                        <Text style = {styles.text}>{data['text']}</Text>
                    </View>
                }
                )}
            </ScrollView>
        )
    }
}

export default ResponseCard

const styles = StyleSheet.create({
    view: {
        paddingTop: 10,
        paddingBottom: 10,
        width: width * .9,
        minHeight: height*0.1,
        margin: 10,
        marginLeft: width * 0.05,
        borderRadius: 5,
        backgroundColor: 'rgba(229, 229, 229, 0.5)',
    },
    creator: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        left: 10,
        width: width * 0.7,
        overflow: 'hidden',
    },
    text:{
        paddingTop: 10,
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'left',
        width: width*0.8,
        marginLeft: width*0.05,
        fontSize: 15,
        numberOfLines: 'auto'
    },
    textTitle:{
        fontSize: 17,
        color: 'black',
        width: width*0.9,
        marginLeft: width*0.05,
        fontWeight: '500',
    },
    profile_image: {
        marginLeft: width*0.03,
        width: width * 0.1,
        height: width * 0.1,
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.15)', borderRadius: 180,
    },
    viewRating:{
        flexDirection: 'row',
        width: width * 0.15,
    },
    textRating:{
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'left',
        marginLeft: width*0.05,
        fontSize: 17,
    },
    star: {
        marginLeft: 5,
        flexDirection: 'row',
        width: width * 0.3,
    },
    viewColumn:{
        flexDirection: 'column',
    }
})