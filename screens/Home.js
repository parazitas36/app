import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import SearchBtn from '../components/buttons/SearchBtn';
import Card from '../components/Card';

const styles = StyleSheet.create({
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

const Home = () => {
    return (
        <ScrollView style={styles.mainView}>
            <View>
                <Searchbar placeholder='Search'/>
            </View>
            <View style={styles.view}>
                <Card />
                <Card />
                <Card />
            </View>
        </ScrollView>
    );
}

export default Home;
