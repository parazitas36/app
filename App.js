import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Welcome from './screens/Welcome';

export const Context = React.createContext();

const WelcomeScreenStack = createStackNavigator();
const HomeScreenStack = createStackNavigator();
const ProfileScreenStack = createStackNavigator();

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

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <Context.Provider value={{ loggedIn, setLoggedIn }}>
      <NavigationContainer>
        {
          loggedIn === true
          &&
          <Tab.Navigator activeColor='#000000' >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: () => (
                  <FontAwesome5 name={"home"} size={30}/>
                )
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: () => (
                  <Ionicons name={"person-outline"} size={30}/>
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
