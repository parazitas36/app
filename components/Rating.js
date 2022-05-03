import { View, StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'




const RatingBlock = (props) => {

    const [stars, setStars] = React.useState([1, 2, 3, 4, 5]);
	const [rating, setRating] = React.useState(0);
    <Text style = {styles.rating}>Rate the guide</Text>
    return (
        <ScrollView>
            <View>
                <Text style={styles.text}>Rate the guide</Text>
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
            
        </ScrollView>
       
      )
      
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
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: 'black',
    },
    stars:{
        flexDirection: 'row'
    }
})