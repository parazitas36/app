import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ImageBackground,
    ToastAndroid
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { RegisterAPI } from '../api/RegisterAPI';
import Button from '../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const image = require('../assets/images/welcome.png');

const Register = ({ navigation }) => {
    const [email, setEmail] = React.useState(null);
    const [fname, setFname] = React.useState(null);
    const [lname, setLname] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [rpassword, setRPassword] = React.useState(null);
    const [waiting, setWaiting] = React.useState(false);

    const checkEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            return false;
        }
        return true;
    }

    const Post_Register = async () => {
        if (!fname || !lname || !email || !password || !rpassword) {
            ToastAndroid.show(
                "All fields must be filled!",
                ToastAndroid.SHORT)
            return;
        }
        if (password !== rpassword) {
            ToastAndroid.show(
                "Passwords do not match!",
                ToastAndroid.SHORT)
            return;
        }
        if (checkEmail()) {
            const data = {
                "firstname": fname,
                "lastname": lname,
                "email": email,
                "password": password
            }
            setWaiting(true);
            const resp = await RegisterAPI(data);
            if (resp && resp.status !== 201) {
                setWaiting(false);
            } else if (resp) {
                setWaiting(false);
                navigation.navigate("Login");
            }

        } else {
            ToastAndroid.show(
                "Email address you have entered is invalid!",
                ToastAndroid.SHORT)
            return;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground blurRadius={5} source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <ScrollView contentContainerStyle={styles.loginForm}>
                    <Text style={styles.txt}>Register</Text>
                    {waiting && <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center' }} />
                    }
                    {!waiting &&
                        <View style={{ flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.2)', marginVertical: 5, borderRadius: 10 }}>
                            <View style={styles.icon}>
                                <Ionicons color={'white'} size={28} name="person-sharp" />
                            </View>
                            <TextInput style={styles.txtInputfname} onChangeText={setFname} placeholder={"First Name"} placeholderTextColor={'white'} />
                            <TextInput style={styles.txtInputlname} onChangeText={setLname} placeholder={"Last Name"} placeholderTextColor={'white'} />
                        </View>
                    }
                    {!waiting &&
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.inputView}>
                                <View style={styles.icon}>
                                    <Fontisto color={'white'} size={28} name="email" />
                                </View>
                                <TextInput style={styles.txtInput} textContentType="emailAddress" keyboardType="email-address" onChangeText={setEmail} placeholder={"Email Address"} placeholderTextColor={'white'} />
                            </View>
                            <View style={styles.inputView}>
                                <View style={styles.icon}>
                                    <Fontisto color={'white'} size={28} name="locked" />
                                </View>
                                <TextInput textContentType="password" secureTextEntry={true} style={styles.txtInput} onChangeText={setPassword} placeholder={"Password"} placeholderTextColor={'white'} />
                            </View>
                            <View style={styles.inputView}>
                                <View style={styles.icon}>
                                    <Fontisto color={'white'} size={28} name="locked" />
                                </View>
                                <TextInput textContentType="password" secureTextEntry={true} style={styles.txtInput} onChangeText={setRPassword} placeholder={"Repeat Password"} placeholderTextColor={'white'} />
                            </View>
                            <Button styles={styles} title='Register' onPress={() => { Post_Register() }} />
                        </View>
                    }
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    loginForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    txtInput: {
        width: 300,
        fontSize: 17,
        color: 'white',
        marginLeft: 5
    },
    txtInputfname: {
        width: 145,
        height: 50,
        fontSize: 17,
        borderRightColor: 'rgba(255, 255, 255, 0.5)',
        borderRightWidth: 1,
        marginLeft: 5,
        color: 'white'
    },
    txtInputlname: {
        width: 145,
        height: 50,
        fontSize: 17,
        borderRadius: 10,
        marginLeft: 5,
        color: 'white'
    },
    txt: {
        color: "#fff",
        fontSize: 42,
        fontWeight: '500',
        marginBottom: 30,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        textShadowRadius: 7
    },
    btn: {
        width: 125,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    btntxt: {
        color: '#000',
        fontSize: 22,
        fontWeight: '500'
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginVertical: 5,
        borderRadius: 10,
        height: 50,
    },
    icon: {
        height: 50,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1.5,
        borderTopLeftRadius: 10,
        borderBottomStartRadius: 10
    },
})

export default Register;