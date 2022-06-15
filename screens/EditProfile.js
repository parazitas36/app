import * as React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    Dimensions,
    Alert
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ChangePassword } from '../api/ChangePassword';
import { ChangeNames } from '../api/ChangeNames';
import { UploadProfilePicture } from '../api/UploadProfilePicture';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Context } from '../App';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const image = require('../assets/images/background.png');
const profile_img = "https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg"
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center'
    },
    editView: {
        width: '30%',
        alignItems: 'center'
    },
    btn: {
        width: 110,
        height: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        borderRadius: 5,
    },
    btntxt: {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    },
    viewLeft:{
        alignItems: 'flex-start',
        width: width * 0.45,
        justifyContent: 'center',
        height: 100,
        borderColor: 'black',
        borderWidth: 1
    },
    viewRight:{
        alignItems: 'flex-start',
        width: width * 0.45,
        justifyContent: 'center',
        height: 100,
        borderColor: 'black',
        borderWidth: 1
    }, 
    viewLeftImg:{
        alignItems: 'center',
        width: width * 0.45,
        justifyContent: 'center',
        height: 150,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 5,
    },
    viewRightImg:{
        alignItems: 'center',
        width: width * 0.45,
        justifyContent: 'center',
        height: 150,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 1,
        marginLeft: 5,
    }, 
    viewLeftPSW:{
        alignItems: 'flex-start',
        width: width * 0.45,
        justifyContent: 'center',
        height: 150,
        borderColor: 'black',
        borderWidth: 1
    },
    viewRightPSW:{
        alignItems: 'flex-start',
        width: width * 0.45,
        justifyContent: 'center',
        height: 150,
        borderColor: 'black',
        borderWidth: 1
    },
    viewRow:{
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        width: width*0.9,
        marginLeft: width*0.05,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        borderEndColor: 'black',
        borderBottomWidth: 2,
        width: width*0.3,
        height: 40,
        fontSize: 16,
        color: 'black',
        marginLeft: 10
    },
    text:{
        fontSize: 16,
        color: 'black',
        alignContent: 'center',
        marginTop: 1,
        height: 40,
        marginLeft: 10,
        paddingTop: 17,
        fontWeight: '500',
    },
    textImg:{
        fontSize: 16,
        color: 'black',
        alignContent: 'center',
        height: 40,
        fontWeight: '500',
    },
    textTitle:{
        color: 'black',
        fontSize: 19,
        fontWeight: '500',
    },
    btnSave:{
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
    },
    viewBTNDiscard:{
        marginRight: 10,
        width: 90,
        height: 35,
        paddingLeft: 5,
    },
    viewBTNSave:{
        marginLeft: 10,
        width: 90,
        height: 35,
        paddingRight: 5,
    },
    btnPressSave:{
        backgroundColor: '#5B9875',
        width: 80,
        height: 35,
        borderWidth: 1.85,
        borderColor: '#5B9875',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        borderRadius: 5,
        marginTop: 5,
    },
    btnPressDiscard:{
        backgroundColor: '#AD2C1F',
        width: 80,
        height: 35,
        borderWidth: 1.85,
        borderColor: '#AD2C1F',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        borderRadius: 5,
        marginTop: 5,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 180,
        overflow: 'hidden',
    },
    viewEndPage: {
        height: 100,
    }
})

const EditProfile = () => {
    const profile_img = "https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg"
    const [profileImage, setProfileImage] = React.useState("")
    const { accInfo } = React.useContext(Context);
    const [oldpassword, setOld] = React.useState("")
    const [newPassword, setNew] = React.useState("")
    const [newPasswordreEnter, setNewReEnter] = React.useState("")
    const [userInfo, setUserInfo] = accInfo;
    const [photo, setPhoto] = React.useState(null)
    
    const [newFName, setFname] = React.useState(userInfo['firstname'])
    const [newLName, setLname] = React.useState(userInfo['lastname'])
    console.log(newFName)

    const uploadPhoto = async () => {
        const options = {
            mediaType: 'photo'
        }

        try {
            const result = await launchImageLibrary(options);
            if (result.didCancel) {
                setPhoto(null);
            } else {
                setPhoto(result);
            }
        } catch (e) {
            setPhoto(null);
        }
    }

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

    const ChangePasswordMethod = async (uid) => {
        if(oldpassword !== "" && newPassword !== "" && newPasswordreEnter !== "" && newPassword === newPasswordreEnter){
            var res = await ChangePassword(oldpassword, newPassword, uid)
            if(res === null){
                Alert.alert("Failed","Old password that you entered is incorrect",[
                    {text: "Ok"}
                ])
            }else{
                Alert.alert("Successful","Password changed",[
                    {text: "Ok"}
                ])
            }
        }else if(newPassword !== newPasswordreEnter){
            Alert.alert("Notice","New password does not match repeated password",[
                {text: "Ok"}
            ])
        }else{
            Alert.alert("Notice","You must to enter all the fields to change your password",[
                {text: "Ok"}
            ])
        }
    };
    const ChangeNameOrLName = async (uid) => {
        if(newFName !== "" && newLName !== ""){
            var res = await ChangeNames(newFName, newLName, uid)
            if(res === null){
                Alert.alert("Failed","Something went wrong, names were not changed",[
                    {text: "Ok"}
                ])
            }else{
                const json = await res.json();
                setUserInfo(json);
                Alert.alert("Successful","FirstName and LastName were changed",[
                    {text: "Ok"}
                ])
            }
        }else{
            Alert.alert("Notice","First name and Last name were empty, please enter them first",[
                {text: "Ok"}
            ])
        }
    };

    const ChangePhoto = async (photo, uid) => {
        if(photo !== null){
            var res = await UploadProfilePicture(photo, uid)
            console.log(res.status);
            if(res.status !== 200){
                Alert.alert("Failed","Something went wrong, image was not changed",[
                    {text: "Ok"}
                ])
            }else{
                Alert.alert("Successful","Image was changed",[
                    {text: "Ok"}
                ])
                const json = await res.json();
                setUserInfo(json);
            }
        }else{
            Alert.alert("Notice","Please upload an image first",[
                {text: "Ok"}
            ])
        }
    };

    return(
        <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
            <ScrollView >
                <View style={styles.viewRow}>
                    <Text style={styles.textTitle}>Change profile picture</Text>
                </View>
                <View style={styles.viewRow}>
                    <View style={styles.viewLeftImg}>
                        <Text style={styles.textImg}>Current image</Text>
                        <View style={styles.profileImageView}>
                                <Image style={styles.profileImage} source={{ uri: profileImage }} />
                        </View>
                    </View>
                    <View style={styles.viewRightImg}>
                        <Text style={styles.textImg}>Chosen image</Text>
                        <TouchableOpacity>
                            <Pressable onPress={uploadPhoto}>
                                {photo &&
                                    <Image style={styles.profileImage} source={{ uri: photo.assets[0].uri }} />
                                }
                                {!photo &&
                                    <FontAwesome  name='cloud-upload' size={80} color={'black'} />
                                }
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.viewRow}>
                    <View style={styles.viewBTNSave}>
                        <TouchableOpacity>
                            <Pressable style={styles.btnPressSave} onPress={()=>{ChangePhoto(photo, userInfo['_id'])}}>
                                <Text style={styles.btnSave}>Save</Text>
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.viewRow}>
                    <Text style={styles.textTitle}>Change name</Text>
                </View>
                <View style={styles.viewRow}>
                    <View style={styles.viewLeft}>
                        <Text style={styles.text}>First name</Text>
                        <Text style={styles.text}>Last name</Text>
                    </View>
                    <View style={styles.viewRight}>
                        <TextInput 
                        style={styles.input} 
                        onChangeText={setFname} 
                        defaultValue={userInfo['firstname']} 
                        placeholder={"your first name"}>
                        </TextInput>
                        <TextInput 
                        style={styles.input} 
                        onChangeText={setLname}
                        defaultValue={userInfo['lastname']} 
                        placeholder={"your last name"}>
                        </TextInput>
                    </View>
                </View>
                <View style={styles.viewRow}>
                    <View style={styles.viewBTNSave}>
                        <TouchableOpacity>
                            <Pressable style={styles.btnPressSave} onPress={()=>{ChangeNameOrLName(userInfo['_id'])}}>
                                <Text style={styles.btnSave}>Save</Text>
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                </View>  
                <View style={styles.viewRow}>
                    <Text style={styles.textTitle}>Change password</Text>
                </View>
                <View style={styles.viewRow}>
                    <View style={styles.viewLeftPSW}>
                        <Text style={styles.text}>Old password</Text>
                        <Text style={styles.text}>New password</Text>
                        <Text style={styles.text}>Repeat new password</Text>
                    </View>
                    <View style={styles.viewRightPSW}>
                        <TextInput 
                            style={styles.input} 
                            secureTextEntry={true} 
                            placeholder={"********"}
                            onChangeText = {setOld}>
                        </TextInput>
                        <TextInput 
                            style={styles.input} 
                            secureTextEntry={true} 
                            placeholder={"********"}
                            onChangeText = {setNew}>
                        </TextInput>
                        <TextInput 
                            style={styles.input} 
                            secureTextEntry={true} 
                            placeholder={"********"}
                            onChangeText = {setNewReEnter}>
                        </TextInput>
                    </View>
                </View>

                <View style={styles.viewRow}>
                    <View style={styles.viewBTNSave}>
                        <TouchableOpacity>
                            <Pressable style={styles.btnPressSave} onPress={()=>{ChangePasswordMethod(userInfo['_id'])}}>
                                <Text style={styles.btnSave}>Save</Text>
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                    
                    {/* <View style={styles.viewBTNDiscard}>
                        <TouchableOpacity>
                            <Pressable style={styles.btnPressDiscard} onPress={()=>{console.log("paspaude")}}>
                                <Text style={styles.btnSave}>Discard</Text>
                            </Pressable>
                        </TouchableOpacity>
                    </View> */}
                </View> 
                <View style={styles.viewEndPage}></View>   
            </ScrollView>
        </ImageBackground>
        
    )
}

export default EditProfile;