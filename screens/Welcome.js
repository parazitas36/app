import React, { useContext } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Context } from '../App';
import Button from '../components/Button';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },
    btn: {
        backgroundColor: "rgba(25, 105, 235, 1)",
        width: width*.9,
        height: 60,
        borderRadius: 30,
        marginVertical: 10,
        justifyContent: 'center'
    },
    btntxt: {
        color: 'white',
        fontSize: 28,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    text: {
        color: 'rgba(50, 50, 50, 1)',
        fontSize: 36,
        fontWeight: '500',
        marginBottom: 15
    }
})

const stylesLogin = StyleSheet.create({
    btn: {
        backgroundColor: "#eeeeee",
        borderWidth: 1,
        borderColor: 'rgba(25, 105, 235, 1)',
        width: width*.9,
        height: 60,
        borderRadius: 30,
        marginVertical: 10,
        justifyContent: 'center'
    },
    btntxt: {
        color: 'rgba(25, 105, 235, 1)',
        fontSize: 28,
        alignSelf: 'center',
        fontWeight: 'bold'
    }
})

const Welcome = ({navigation}) => {
    return (
        <View style={styles.view}>
            <Text style={styles.text}>Welcome!</Text>
            <Button title='Login' styles={stylesLogin} onPress={() => navigation.push('Login')}/>
            <Button title='Register' styles={styles} onPress={() => navigation.push('Register')}/>
        </View>
    );
}

export default Welcome;
