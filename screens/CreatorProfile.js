import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../App'
import { GetCreator } from '../api/GetCreator'
import { ActivityIndicator } from 'react-native-paper'
import Button from '../components/Button'
import { Unfollow } from '../api/Unfollow';
import { Follow } from '../api/Follow';

const profile_img = "https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg"

const CreatorProfile = () => {
    const { creatorInfo, accInfo } = useContext(Context);
    const [chosenProfileID, setChosenProfileID] = creatorInfo;
    const [profileData, setProfileData] = React.useState(null);
    const [userInfo, setUserInfo] = accInfo;
    const [update, setUpdate] = React.useState(false);
    const [profileImage, setProfileImage] = React.useState("")

    React.useLayoutEffect(() => {
        (async() => {
            const resp = await GetCreator(chosenProfileID);
            const json = await resp.json();
            setUpdate(false);
            setProfileData(json);
            if(json['ppicture'] === "" || json['ppicture'] === null){
                setProfileImage("https://i.pinimg.com/736x/1e/ea/13/1eea135a4738f2a0c06813788620e055.jpg")
            }else{
                setProfileImage(json['ppicture']);
            }  
        })()
    },[update])

    if(!profileData){
        return <ActivityIndicator />
    }

  return (
    <View style={styles.view}>
      <View style={styles.image_view}>
          <Image style={styles.image} source={{uri: profileImage}}/>
          <Text style={{color: 'black', marginTop: 20, fontSize: 26, textAlign: 'center'}}>{profileData['firstname']} {profileData['lastname']}</Text>
          <Button title={userInfo['followed'].includes(chosenProfileID) ? "unfollow" : "follow"} styles={styles}
            onPress={async() => {
                if(userInfo['followed'].includes(chosenProfileID)){
                    const resp = await Unfollow(chosenProfileID, userInfo['_id']);
                    for(let i = 0; i < userInfo['followed'].length; i++){
                        if(userInfo['followed'][i] === chosenProfileID){
                            for(let j = i; j < userInfo['followed'].length - 1; j++){
                                userInfo['followed'][j] = userInfo['followed'][j+1];
                            }
                            userInfo['followed'].pop();
                            break;
                        }
                    }
                    console.log(resp);
                    setUpdate(true);
                }else{
                    const resp = await Follow(chosenProfileID, userInfo['_id']);
                    console.log(resp);
                    userInfo['followed'].push(chosenProfileID);
                    setUpdate(true);
                }
            }}
          />
      </View>
      <View style={styles.stats_view}>
          <View style={styles.followers}>
              <Text style={styles.txt}>Followers</Text>
              <Text style={styles.txt}>{profileData['followers'].length}</Text>
          </View>
          <View style={styles.following}>
              <Text style={styles.txt}>Following</Text>
              <Text style={styles.txt}>{profileData['followed'].length}</Text>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(243, 246, 251)'
    },
    image_view: {
        width: 200,
        marginBottom: 50,
    },
    image: {
        aspectRatio: 1,
        width: 200,
        borderRadius: 180,
        borderWidth: 3,
        borderColor: 'rgba(0, 0, 0, 0.025)',
    },
    stats_view: {
        flexDirection: 'row',
        marginBottom: 100,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    followers: {
        width: '50%',
    },
    following: {
        width: '50%',
    },
    txt: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18
    },
    btn: {
        width: 90,
        height: 30,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 12,
        alignSelf: 'center',
        marginTop: 15
    },
    btntxt: {
        fontSize: 19,
        color: 'black',
        textAlign: 'center'
    }
});

export default CreatorProfile