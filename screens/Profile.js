import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import SearchBtn from '../components/buttons/SearchBtn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button'
import { Context } from '../App';

const image = require('../assets/images/background.png');
const profile_img = "https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg"

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center'
    },
    userview: {
        marginTop: 20,
        backgroundColor: 'rgba(229, 229, 229, 0.3)',
        width: '96%',
        height: 120,
        flexDirection: 'row',
        borderRadius: 5,
    },
    profileImageView: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 180,
        overflow: 'hidden',
        
    },
    profileName: {
        width: '45%',
        justifyContent: 'center'
    },
    profileNameText: {
        fontSize: 20,
        color: 'black',
        marginBottom: 25,
        paddingHorizontal: 5
    },
    editView: {
        width: '30%',
        alignItems: 'center'
    },
    btn: {
        width: '100%',
        height: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 1,
        paddingHorizontal: 3
    },
    btntxt: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    }
})

const Profile = ({navigation}) => {

    const { accInfo } = React.useContext(Context);
    const [userInfo, setUserInfo] = accInfo;
    const [profileImage, setProfileImage] = React.useState("")

    React.useLayoutEffect(() => {
        (async() => {
            console.log(userInfo);
            if(userInfo['ppicture'] === "" || userInfo['ppicture'] === null){
                setProfileImage("https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg")
            }else{
                setProfileImage(userInfo['ppicture']);
            }
        })()
    },[])


    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <View style={styles.view}>
                    <View style={styles.userview}>
                        <View style={styles.profileImageView}>
                            <Image style={styles.profileImage} source={{ uri: profileImage }} />
                        </View>
                        <View style={styles.profileName}>
                            <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.profileNameText}>Name Surname</Text>
                        </View>
                        <View style={styles.editView}>
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 15,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <FontAwesome name='star' size={20} color="gold" />
                                <FontAwesome style={{ marginLeft: 1 }} name='star' size={20} color="gold" />
                                <FontAwesome style={{ marginLeft: 1 }} name='star' size={20} color="gold" />
                                <FontAwesome style={{ marginLeft: 1 }} name='star' size={20} color="gold" />
                                <FontAwesome style={{ marginLeft: 1 }} name='star' size={20} color="gold" />

                            </View>
                            <View style={{
                                position: 'absolute',
                                bottom: 8,
                            }}>
                                <Button onPress={()=>{navigation.navigate("EditProfile")}} styles={styles} title={"Edit Profile"} />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export default Profile;
