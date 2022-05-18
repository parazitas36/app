import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, StatusBar, View } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Welcome from './screens/Welcome';
import EditGuide from './screens/EditGuide';
import CreateGuide from './screens/CreateGuide';
import EditProfile from './screens/EditProfile';
import Guide from './screens/Guide';
import CreatorProfile from './screens/CreatorProfile';
import SearchMaps from './screens/SearchMaps';
import Maps from './screens/Maps';
import MyGuides from './screens/MyGuides';

export const Context = React.createContext();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WelcomeScreenStack = createStackNavigator();
const HomeScreenStack = createStackNavigator();
const CreateGuideScreenStack = createStackNavigator();
const ProfileScreenStack = createStackNavigator();

const WelcomeScreen = () => {
  return (
    <WelcomeScreenStack.Navigator>
      <WelcomeScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="Welcome" component={Welcome} />
      <WelcomeScreenStack.Screen options={{ animationEnabled: true, headerShown: false  }} name="Login" component={Login} />
      <WelcomeScreenStack.Screen options={{ animationEnabled: true, headerShown: false  }} name="Register" component={Register} />
    </WelcomeScreenStack.Navigator>
  );
}
const ProfileScreen = () =>{
  return(
    <ProfileScreenStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center'
    }}
    >
      <ProfileScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="Profile" component={Profile} />
      <ProfileScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="EditProfile" component={EditProfile} />
    </ProfileScreenStack.Navigator>
  )
}

const HomeScreen = () => {
  return (
    <HomeScreenStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center'
      }}
    >
      <HomeScreenStack.Screen options={{ headerShown: false, animationEnabled: true }} name="Home" component={Home} />
      <HomeScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="Guide" component={Guide} />
      <HomeScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="CreatorProfile" component={CreatorProfile} />
    </HomeScreenStack.Navigator>
  );
}

const CreateGuideScreen = () => {
  return (
    <CreateGuideScreenStack.Navigator>
      <CreateGuideScreenStack.Screen options={{ headerShown: false, animationEnabled: true }} name="CreateGuide" component={CreateGuide} />
      <CreateGuideScreenStack.Screen options={{ headerShown: false, animationEnabled: true }} name="Maps" component={Maps} />
    </CreateGuideScreenStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [chosenGuideID, setChosenGuideID] = React.useState(null);
  const [chosenProfileID, setChosenProfileID] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  return (
    <Context.Provider value={{
      loggedIn, setLoggedIn,
      guideID: [chosenGuideID, setChosenGuideID],
      accInfo: [userInfo, setUserInfo],
      creatorInfo: [chosenProfileID, setChosenProfileID]
    }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#eeeeee" />
      <NavigationContainer>
        {
          loggedIn === false
          &&
          <WelcomeScreen />
        }
        {
          loggedIn === true
          &&
          <View style={{ backgroundColor: 'rgb(242, 242, 242)', height: '100%' }}>
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: {
                  height: 65,
                  borderRadius: 10,
                  width: '96%',
                  marginLeft: '2%',
                  marginBottom: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  paddingBottom: 9,
                  paddingTop: 6,
                  position: 'absolute',
                  overflow: 'visible'
                },
                tabBarIconStyle: {
                  width: 32,
                  height: 32,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  position: 'absolute',
                  margin: 0,
                  overflow: 'visible',
                  elevation: 15,
                  zIndex: 9999
                },
                tabBarLabelStyle: {
                  fontSize: 13,
                  position: 'absolute',
                },
                tabBarActiveTintColor: 'rgba(55, 155, 200, 1)',
                headerShown: false,
                tabBarHideOnKeyboard: true
              }}
            >
              <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                  tabBarLabel: "Home",
                  tabBarIconStyle: {
                    marginTop: -16
                  },
                  tabBarIcon: (props) => (
                    <FontAwesome5 name={"home"} size={props.size} color={props.color} />
                  )
                }}
              />
              <Tab.Screen
                name="MyGuides"
                component={MyGuides}
                options={{
                  tabBarLabel: "My Guides",
                  tabBarIconStyle: {
                    marginTop: -16
                  },
                  tabBarIcon: (props) => (
                    <FontAwesome5 name={"book"} size={props.size} color={props.color} />
                  )
                }}
              />
              <Tab.Screen
                name="GuideCreationTab"
                component={CreateGuideScreen}
                options={{
                  tabBarLabel: "",
                  tabBarLabelStyle: {
                    height: 0,
                    visibility: 'hidden'
                  },
                  tabBarIconStyle: {
                    overflow: 'visible',
                    elevation: 15,
                    zIndex: 9999,
                    padding: 0,
                  },
                  tabBarIcon: (props) => (
                    <FontAwesome5 style={props.style} name={"plus-circle"} size={props.size * 1.75} color={props.color} />
                  )
                }}
              />
              <Tab.Screen
                name="SearchMaps"
                component={SearchMaps}
                options={{
                  tabBarLabel: "Explore",
                  tabBarIconStyle: {
                    marginTop: -16
                  },
                  tabBarIcon: (props) => (
                    <Fontisto name={"world-o"} size={props.size} color={props.color} />
                  )
                }}
              />
              <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{
                  tabBarLabel: "Profile",
                  tabBarIconStyle: {
                    marginTop: -16
                  },
                  tabBarIcon: (props) => (
                    <Ionicons name={"person-outline"} size={props.size} color={props.color} />
                  )
                }}
              />
            </Tab.Navigator>
          </View>
        }

      </NavigationContainer>
    </Context.Provider>
  );
};


export default App;
