import React, { useContext } from 'react'
import { View, Button } from 'react-native';
import { Context } from '../App';

const Welcome = ({navigation}) => {
    return (
        <View>
            <Button title='Login' onPress={() => navigation.push('Login')}/>
            <Button title='Register' onPress={() => navigation.push('Register')}/>
        </View>
    );
}

export default Welcome;
