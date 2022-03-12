import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Welcome from './screens/Welcome';
import CreateGuide from './screens/CreateGuide';
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
      <WelcomeScreenStack.Screen name="Welcome" component={Welcome} />
      <WelcomeScreenStack.Screen name="Login" component={Login} />
      <WelcomeScreenStack.Screen name="Register" component={Register} />
    </WelcomeScreenStack.Navigator>
  );
}

const HomeScreen = () => {
  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen name="Home" component={Home} />
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
      <CreateGuideScreenStack.Screen name="Guide Creation" component={CreateGuide} />
    </CreateGuideScreenStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
 
  return (
    <Context.Provider value={{ loggedIn, setLoggedIn }}>
      <NavigationContainer>
        {
          loggedIn === true
          &&
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: {
                height: windowHeight*.08,
              },
              tabBarIconStyle:{
                width: windowHeight*.04,
                height: windowHeight*.04,
              },
              tabBarLabelStyle:{
                fontSize: 13,
              },
              headerShown: false
            }}
          >
            <Tab.Screen
              name="HomeTab"
              component={HomeScreen}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: () => (
                  <FontAwesome5 name={"home"} size={windowHeight*.04} color={'black'}/>
                )
              }}
            />
            <Tab.Screen
              name="GuideCreationTab"
              component={CreateGuideScreen}
              options={{
                tabBarLabel: "Guide Creation",
                tabBarIcon: () => (
                  <FontAwesome5 name={"plus-circle"} size={windowHeight*.04} color={'black'}/>
                )
              }}
            />
            <Tab.Screen
              name="ProfileTab"
              component={ProfileScreen}
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: () => (
                  <Ionicons name={"person-outline"} size={windowHeight*.04} color={'black'} />
                )
              }}
            />
          </Tab.Navigator>
        }
        {
          loggedIn === false
          &&
          <WelcomeScreen />
        }
      </NavigationContainer>
    </Context.Provider>
  );
};


export default App;
