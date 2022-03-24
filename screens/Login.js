import * as React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
import { Context } from '../App';
import Button from '../components/Button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = () => {
    const {loggedIn, setLoggedIn} = React.useContext(Context);
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    return (
        <View style={styles.loginForm}>
            <Text style={styles.txt}>Login</Text>
            <TextInput style={styles.txtInput} onChangeText={setUsername} placeholder={"Enter your username"}/>
            <TextInput style={styles.txtInput} onChangeText={setPassword} placeholder={"Enter your password"}/>
            <Button styles={styles} title='Login' onPress={() => {console.log(username, password); setLoggedIn(true)}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    loginForm:{
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
        width: windowWidth *.5,
        textAlign: 'center',
        fontSize: 17,
        color: 'grey'
    },
    txt: {
        color: "#000",
        fontSize: 36,
        marginBottom: 5,
    },
    btn: {
        width: windowWidth*.25,
        alignItems: 'center',
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 10,
    },
    btntxt:{
        color: '#000',
        fontSize: 20,
    }
})

export default Login;