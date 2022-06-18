import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, StatusBar, View } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

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
import PaymentScreen from './screens/PaymentScreen';

export const Context = React.createContext();
const publishableKey = "pk_test_51L0Yf4FAWZEgTFzW6EjYcmKweFXAAs0Oj7B32s2YpW1GLeWeaDx2ubNCEGe4aBPtnwlNKiIeTnjMDpIzQtNOnXup007BleaihF";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WelcomeScreenStack = createStackNavigator();
const HomeScreenStack = createStackNavigator();
const CreateGuideScreenStack = createStackNavigator();
const ProfileScreenStack = createStackNavigator();
const ExploreScreenStack = createStackNavigator();

const WelcomeScreen = () => {
  return (
    <WelcomeScreenStack.Navigator>
      <WelcomeScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="Welcome" component={Welcome} />
      <WelcomeScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="Login" component={Login} />
      <WelcomeScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="Register" component={Register} />
    </WelcomeScreenStack.Navigator>
  );
}
const ProfileScreen = () => {
  return (
    <ProfileScreenStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center'
      }}
    >
      <ProfileScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="Profile" component={Profile} />
      <ProfileScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="EditProfile" component={EditProfile} />
      <ProfileScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="CreatorProfile" component={CreatorProfile} />
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
      <HomeScreenStack.Screen options={{ animationEnabled: true, headerShown: false }} name="Payments" component={PaymentScreen} />
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

const ExploreScreen = () => {
  return(
    <ExploreScreenStack.Navigator>
      <ExploreScreenStack.Screen options={{ headerShown: false, animationEnabled: true }} name="SearchMaps" component={SearchMaps} />
      <ExploreScreenStack.Screen options={{ headerShown: false, animationEnabled: true }} name="Guide" component={Guide} />
    </ExploreScreenStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [chosenGuideID, setChosenGuideID] = React.useState(null);
  const [chosenProfileID, setChosenProfileID] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);
  const [refreshPicture, setRefreshPicture] = React.useState(false);

  return (
    <StripeProvider
      publishableKey={publishableKey}
    >
      <Context.Provider value={{
        loggedIn, setLoggedIn,
        guideID: [chosenGuideID, setChosenGuideID],
        accInfo: [userInfo, setUserInfo],
        creatorInfo: [chosenProfileID, setChosenProfileID],
        refreshProfilePicture: [refreshPicture, setRefreshPicture]
      }}
      >
        <StatusBar barStyle="light-content" backgroundColor={loggedIn ? "rgba(123, 145, 170, 0.8)" : "#4D4041"} />
        <NavigationContainer>
          {
            loggedIn === false
            &&
            <WelcomeScreen />
          }
          {
            loggedIn === true
            &&
            <View style={{ backgroundColor: 'rgb(243, 246, 251)', height: '100%' }}>
              <Tab.Navigator
                screenOptions={{
                  tabBarStyle: {
                    height: 65,
                    borderRadius: 10,
                    width: '96%',
                    marginLeft: '2%',
                    marginBottom: 10,
                    backgroundColor: "rgba(243, 246, 251, 0.9)",
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
                  tabBarActiveTintColor: '#A894BA',
                  tabBarInactiveTintColor: 'rgba(123, 145, 170, 0.7)',
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
                      <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: -2,
                        alignSelf: 'center',
                        width: 71,
                        height: 71,
                      }}>
                        <Entypo size={70} name={"circle-with-plus"} color={props.focused ? '#A894BA' : 'rgba(123, 145, 170, 0.7)'} />
                      </View>
                    )
                  }}
                />
                <Tab.Screen
                  name="SearchMaps"
                  component={ExploreScreen}
                  options={{
                    tabBarLabel: "Explore",
                    tabBarIconStyle: {
                      marginTop: -16
                    },
                    tabBarIcon: (props) => (
                      <Entypo name={"globe"} size={props.size} color={props.color} />
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
                      <Ionicons name={"person-sharp"} size={props.size} color={props.color} />
                    )
                  }}
                />
              </Tab.Navigator>
            </View>
          }

        </NavigationContainer>
      </Context.Provider>
    </StripeProvider>
  );
};


export default App;
