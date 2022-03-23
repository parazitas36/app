import * as React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import SearchBtn from '../components/buttons/SearchBtn';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    text:{
        color: 'black',
        fontSize: 36,
    },
    mainView: {
        flex: 1,
    },
    view:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5, 
        backgroundColor: 'white',
    }
})

const Profile = () => {
    return (
        <View style={styles.mainView}>
            <View style={styles.view}>
                <Icon name='person-circle-outline' size={144} color='black' />
                <Text style={styles.text}>
                    Username
                </Text>
            </View>
        </View>
    );
}

export default Profile;
