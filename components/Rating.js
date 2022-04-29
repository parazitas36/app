import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const RatingBlock = (props) => {
    return (
        <View style={styles.rating}>
            <Text>Rate the guide</Text>
            <MaterialIcons name={'star-border'} size={25} color={'gold'}/>
        </View>
      )
}

export default RatingBlock

const styles = StyleSheet.create({
    rating:{
        width: '90%',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 15
    }
})