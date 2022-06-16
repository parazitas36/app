import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import SearchBtn from '../components/buttons/SearchBtn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button'
import { Context } from '../App';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import FollowersList from '../components/FollowersList'
import FollowingList from '../components/FollowingList'


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
        flex: 1.2,
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
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileNameText: {
        fontSize: 20,
        color: 'black',
        paddingHorizontal: 5,
        fontWeight: '500'
    },
    btn: {
        width: 110,
        height: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
    },
    btntxt: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    }
})

const LogoutButtonStyleSheet = StyleSheet.create({
    btn: {
        width: 90,
        height: 35,
        backgroundColor: 'rgba(223, 71, 89, 1)',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
        marginLeft: 10
    },
    btntxt: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    }
})

const Profile = ({ navigation }) => {

    const { accInfo, refreshProfilePicture, setLoggedIn } = React.useContext(Context);
    const [userInfo, setUserInfo] = accInfo;
    const [refreshPicture, setRefreshPicture] = refreshProfilePicture;
    const [profileImage, setProfileImage] = React.useState("")
    const [listToggler, setListToggler] = React.useState(null);

    const ToggleList = (listType) => {
        if (listType !== listToggler) {
            setListToggler(listType)
            return;
        }
        setListToggler(null);
    }

    React.useLayoutEffect(() => {
        (async () => {
            console.log(userInfo);
            if (userInfo['ppicture'] === "" || userInfo['ppicture'] === null) {
                setProfileImage("https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg")
            } else {
                setProfileImage(userInfo['ppicture']);
            }
            setRefreshPicture(false);
        })()
    }, [userInfo])

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <View style={styles.view}>
                    <View style={styles.userview}>
                        <View style={styles.profileImageView}>
                            <Image style={styles.profileImage} source={{ uri: profileImage }} />
                        </View>
                        <View style={styles.profileName}>
                            <View style={{
                                flex: 2,
                                width: '100%',
                                alignItems: 'center',
                                paddingHorizontal: 5,
                                marginTop: 10,
                            }}>
                                <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.profileNameText}>{`${userInfo['firstname']} ${userInfo['lastname']}`}</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingHorizontal: 3,
                                marginBottom: 8,
                                flexDirection: 'row'
                            }}>
                                <Button onPress={() => { navigation.navigate("EditProfile") }} styles={styles} title={"Edit Profile"} />
                                <Button onPress={() => { setUserInfo(false); setLoggedIn(false);  }} styles={LogoutButtonStyleSheet} title={"Log Out"} />
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '96%', height: 80, marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Pressable onPress={() => ToggleList("Followers")}>
                                <View style={{ backgroundColor: 'rgba(0, 0, 0, .15)', padding: 10, marginRight: 5, borderRadius: 3 }}>
                                    <Text style={{ color: listToggler === "Followers" ? "white" : 'black', fontWeight: '500', fontSize: 18 }}>Followers: {userInfo['followers'].length}</Text>
                                </View>
                            </Pressable>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Pressable onPress={() => ToggleList("Following")}>
                                <View style={{ backgroundColor: 'rgba(0, 0, 0, .15)', padding: 10, marginLeft: 5, borderRadius: 3 }}>
                                    <Text style={{ color: listToggler === "Following" ? "white" :  'black', fontWeight: '500', fontSize: 18 }}>Following: {userInfo['followed'].length}</Text>
                                </View>
                            </Pressable>
                        </TouchableOpacity>
                    </View>

                    {listToggler && listToggler === "Followers" &&
                        <FollowersList navigation={navigation} userID={userInfo['_id']} />}

                    {listToggler && listToggler === "Following" &&
                        <FollowingList navigation={navigation} userID={userInfo['_id']} />}
                </View>
            </ImageBackground>
        </View>
    );
}

export default Profile;
