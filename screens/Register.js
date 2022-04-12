import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { RegisterAPI } from '../api/RegisterAPI';
import { Context } from '../App';
import Button from '../components/Button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = ({ navigation }) => {
    const [email, setEmail] = React.useState(null);
    const [fname, setFname] = React.useState(null);
    const [lname, setLname] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [rpassword, setRPassword] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [waiting, setWaiting] = React.useState(false);

    const checkEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            return false;
        }
        return true;
    }

    const Post_Register = async () => {
        setError(null);
        if (!fname || !lname || !email || !password || !rpassword) {
            setError("You cannot leave empty fields!");
            return;
        }
        if (password !== rpassword) {
            setError("Both passwords must match!")
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
                setError("Registration failed! Please try again!")
            } else if(resp) {
                setWaiting(false);
                navigation.navigate("Login");
            }

        } else {
            setError("Your Email Address is invalid!")
            return;
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.loginForm}>
            <Text style={styles.txt}>Register</Text>
            {error &&
                <Text style={{ fontSize: 16, color: "red", marginBottom: 15 }}>{error}</Text>
            }
            {waiting && <ActivityIndicator color="rgba(55, 155, 200, 1)" size={40} style={{ flex: 1, justifyContent: 'center' }} />
            }
            {!waiting &&
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.txtInputfname} onChangeText={setFname} placeholder={"First Name"} placeholderTextColor={'grey'} />
                    <TextInput style={styles.txtInputlname} onChangeText={setLname} placeholder={"Last Name"} placeholderTextColor={'grey'} />
                </View>
            }
            {!waiting &&
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput style={styles.txtInput} textContentType="emailAddress" keyboardType="email-address" onChangeText={setEmail} placeholder={"Email Address"} placeholderTextColor={'grey'} />
                    <TextInput textContentType="password" secureTextEntry={true} style={styles.txtInput} onChangeText={setPassword} placeholder={"Password"} placeholderTextColor={'grey'} />
                    <TextInput textContentType="password" secureTextEntry={true} style={styles.txtInput} onChangeText={setRPassword} placeholder={"Repeat Password"} placeholderTextColor={'grey'} />
                    <Button styles={styles} title='Register' onPress={() => { Post_Register() }} />
                </View>
            }
        </ScrollView>
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
        width: windowWidth * .8,
        fontSize: 17,
        color: 'black',
    },
    txtInputfname: {
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 5,
        marginBottom: 15,
        width: windowWidth * .375,
        fontSize: 17,
        color: 'black',
        marginRight: windowWidth * .025
    },
    txtInputlname: {
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 5,
        marginBottom: 15,
        width: windowWidth * .375,
        fontSize: 17,
        color: 'black',
        marginLeft: windowWidth * .025
    },
    txt: {
        color: "#000",
        fontSize: 36,
        paddingBottom: 30,
    },
    btn: {
        width: windowWidth * .325,
        alignItems: 'center',
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20
    },
    btntxt: {
        color: '#000',
        fontSize: 20,
    }
})

export default Register;