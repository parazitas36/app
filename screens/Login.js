import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    ImageBackground,
    ToastAndroid
} from 'react-native';
import { Context } from '../App';
import Button from '../components/Button';
import { LoginAPI } from '../api/LoginAPI';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const image = require('../assets/images/welcome.png');

const Login = () => {
    const { loggedIn, setLoggedIn, accInfo } = React.useContext(Context);
    const [userInfo, setUserInfo] = accInfo;
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [waiting, setWaiting] = React.useState(false);

    const checkEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            return false;
        }
        return true;
    }

    const Login_In = async () => {
        if (!email || !password) {
            ToastAndroid.show(
                "You forgot to enter your email or password!",
                ToastAndroid.SHORT)
            return;
        }
        if (checkEmail()) {
            const data = {
                "email": email,
                "password": password
            }
            setWaiting(true);
            const resp = await LoginAPI(data);
            console.log(resp)
            if (resp.status === 200) {
                const json = await resp.json();
                setUserInfo(json);
                setWaiting(false);
                setLoggedIn(true);
            } else if (resp.status === 404) {
                setWaiting(false);
                ToastAndroid.show(
                    "User with email address or password you have entered does not exist!",
                    ToastAndroid.SHORT)
                return
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
                <View style={styles.loginForm}>
                    <Text style={styles.txt}>Login</Text>
                    {waiting && <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center' }} />
                    }
                    {!waiting &&
                        <View style={styles.inputView}>
                            <View style={styles.input}>
                                <View style={styles.icon}>
                                    <Ionicons color={'white'} size={28} name="person-sharp" />
                                </View>
                                <TextInput style={styles.txtInput} onChangeText={setEmail} placeholder={"Email Address"} placeholderTextColor={'white'} />
                            </View>
                            <View style={styles.input}>
                                <View style={styles.icon}>
                                    <Fontisto color={'white'} size={28} name="locked" />
                                </View>
                                <TextInput textContentType="password" secureTextEntry={true} style={styles.txtInput} onChangeText={setPassword} placeholder={"Password"} placeholderTextColor={'white'} />
                            </View>
                            <TouchableOpacity>
                                <Pressable style={styles.loginButton} onPress={() => { Login_In() }}>
                                    <Entypo color={'white'} size={35} name="login" />
                                </Pressable>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
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
        width: 280,
        height: 50,
        fontSize: 17,
        color: '#fff',
        marginLeft: 5
    },
    txt: {
        color: "#fff",
        fontSize: 42,
        fontWeight: '500',
        marginBottom: 15,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        textShadowRadius: 7
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
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
    loginButton: {
        alignSelf: 'flex-end',
        borderColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        marginRight: 5,
        paddingHorizontal: 10,
        marginTop: 5,
    },
    inputView: {
        marginTop: 30,
    }
})

export default Login;