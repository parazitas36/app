import * as React from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { Context } from '../App';

const Login = () => {
    const {loggedIn, setLoggedIn} = React.useContext(Context);
    return (
        <View>
            <Text>
                <Button title='Login' onPress={() => setLoggedIn(true)}/>
            </Text>
        </View>
    );
}

export default Login;