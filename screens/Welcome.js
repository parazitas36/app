import React, { useContext } from 'react'
import { StyleSheet, View, Dimensions, Text, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    buttonsView: {
        width: '90%'
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    title: {
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: 44,
        marginBottom: 60,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        textShadowRadius: 7
    },
    image: {
        width: 250,
        resizeMode: 'contain',
        borderRadius: 3
    },
    registerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    registerText: {
        position: 'absolute',
        top: 9,
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 32,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 3,
            height: 3
        },
        textShadowRadius: 7
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    loginText: {
        position: 'absolute',
        bottom: 15,
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 32,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 3,
            height: 3
        },
        textShadowRadius: 7
    },
})

const image = require('../assets/images/welcome.png');
const loginImage = require('../assets/images/Login.png');
const registerImage = require('../assets/images/Register.png');

const CustomButton = (imageSource, text, buttonStyle, textStyle, onPress) => {
    return (
        <TouchableOpacity>
            <Pressable style={buttonStyle} onPress={onPress}>
                <Image style={styles.image} source={imageSource} />
                <Text style={textStyle}>{text}</Text>
            </Pressable>
        </TouchableOpacity>
    );
}

const Welcome = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <View style={styles.view}>
                    <Text style={styles.title}>Welcome!</Text>
                    <View style={styles.buttonsView}>
                        {CustomButton(
                            loginImage,
                            "Login",
                            styles.loginButton,
                            styles.loginText,
                            () => navigation.push('Login')
                        )}
                        {CustomButton(
                            registerImage,
                            "Register",
                            styles.registerButton,
                            styles.registerText,
                            () => navigation.push('Register')
                        )}
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export default Welcome;
