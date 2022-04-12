import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { Context } from '../App';
import Button from '../components/Button';
import { LoginAPI } from '../api/LoginAPI';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
    const { loggedIn, setLoggedIn, accInfo } = React.useContext(Context);
    const [userInfo, setUserInfo] = accInfo;
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [waiting, setWaiting] = React.useState(false);

    const checkEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            return false;
        }
        return true;
    }

    const Login_In = async () => {
        setError(null);
        if (!email || !password) {
            setError("You cannot leave empty fields!");
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
                setError("Your Email Address or Password is not correct!");
                setWaiting(false);
            }
        } else {
            setError("Your Email Address is invalid!")
            return;
        }
    }

    return (
        <View style={styles.loginForm}>
            <Text style={styles.txt}>Login</Text>
            {waiting && <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center' }} />
            }
            {!waiting && error &&
                <Text style={{ fontSize: 16, color: "red", marginBottom: 15 }}>{error}</Text>
            }
            {!waiting &&
            <View>
                <TextInput style={styles.txtInput} onChangeText={setEmail} placeholder={"Email Address"} placeholderTextColor={'grey'} />
                <TextInput textContentType="password" secureTextEntry={true} style={styles.txtInput} onChangeText={setPassword} placeholder={"Password"} placeholderTextColor={'grey'} />
                <Button styles={styles} title='Login' onPress={() => { Login_In() }} />
            </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    loginForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtInput: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 5,
        marginBottom: 15,
        width: windowWidth * .7,
        fontSize: 17,
        color: 'black',
    },
    txt: {
        color: "#000",
        fontSize: 36,
        marginBottom: 20,
    },
    btn: {
        width: windowWidth * .3,
        alignItems: 'center',
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 5,
        alignSelf: 'center'
    },
    btntxt: {
        color: '#000',
        fontSize: 20,
    }
})

export default Login;