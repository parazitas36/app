import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, StatusBar, View } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Welcome from './screens/Welcome';
import CreateGuide from './screens/CreateGuide';
import Guide from './screens/Guide';
export const Context = React.createContext();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WelcomeScreenStack = createStackNavigator();
const HomeScreenStack = createStackNavigator();
const ProfileScreenStack = createStackNavigator();
const CreateGuideScreenStack = createStackNavigator();

const WelcomeScreen = () => {
  return (
    <WelcomeScreenStack.Navigator>
      <WelcomeScreenStack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
      <WelcomeScreenStack.Screen name="Login" component={Login} />
      <WelcomeScreenStack.Screen name="Register" component={Register} />
    </WelcomeScreenStack.Navigator>
  );
}

const HomeScreen = () => {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <HomeScreenStack.Screen name="Guide" component={Guide} />
    </HomeScreenStack.Navigator>
  );
}

const ProfileScreen = () => {
  return (
    <ProfileScreenStack.Navigator>
      <ProfileScreenStack.Screen name="Profile" component={Profile} />
    </ProfileScreenStack.Navigator>
  );
}

const CreateGuideScreen = () => {
  return (
    <CreateGuideScreenStack.Navigator>
      <CreateGuideScreenStack.Screen name="Create Guide" component={CreateGuide} />
    </CreateGuideScreenStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [chosenGuideID, setChosenGuideID] = React.useState(null);

  return (
    <Context.Provider value={{ loggedIn, setLoggedIn, guideID: [chosenGuideID, setChosenGuideID] }}>
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
                  backgroundColor: "white",
                  paddingBottom: 9,
                  paddingTop: 6,
                  position: 'absolute',
                },
                tabBarIconStyle: {
                  width: 32,
                  height: 32,
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  margin: 0
                },
                tabBarLabelStyle: {
                  fontSize: 13,
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
                  tabBarIcon: (props) => (
                    <FontAwesome5 name={"home"} size={props.size} color={props.color} />
                  )
                }}
              />
              <Tab.Screen
                name="GuideCreationTab"
                component={CreateGuide}
                options={{
                  tabBarLabel: "Create Guide",
                  tabBarIcon: (props) => (
                    <FontAwesome5 name={"plus-circle"} size={props.size} color={props.color} />
                  )
                }}
              />
              <Tab.Screen
                name="ProfileTab"
                component={Profile}
                options={{
                  tabBarLabel: "Profile",
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
