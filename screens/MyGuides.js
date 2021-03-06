import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import UserGuides from './UserGuides';
import Favorites from './Favorites';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Guide from './Guide';
import CreatorProfile from './CreatorProfile';
import EditGuide from './EditGuide';
import PaymentScreen from './PaymentScreen';

const TopTab = createMaterialTopTabNavigator();
const MyGuidesScreenNavigator = createStackNavigator();
const FavoritesScreenNavigator = createStackNavigator();

const MyGuidesScreen = () => {
  return (
    <MyGuidesScreenNavigator.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <MyGuidesScreenNavigator.Screen options={{ headerShown: false, animationEnabled: true }} name="MyGuides" component={UserGuides} />
      <MyGuidesScreenNavigator.Screen options={{animationEnabled: true, headerShown: false}} name="Guide" component={Guide} />
      <MyGuidesScreenNavigator.Screen options={{animationEnabled: true, headerShown: false}} name="CreatorProfile" component={CreatorProfile} />
      <MyGuidesScreenNavigator.Screen options={{animationEnabled: true, headerShown: false}} name="EditGuide" component={EditGuide} />
    </MyGuidesScreenNavigator.Navigator>
  );
}

const FavoritesScreen = () => {
  return (
    <FavoritesScreenNavigator.Navigator
      screenOptions={{
        headerTitleAlign: 'center'
      }}
    >
      <FavoritesScreenNavigator.Screen options={{ headerShown: false, animationEnabled: true }} name="Favorites" component={Favorites} />
      <FavoritesScreenNavigator.Screen options={{animationEnabled: true, headerShown: false}} name="Guide" component={Guide} />
      <FavoritesScreenNavigator.Screen options={{animationEnabled: true, headerShown: false}} name="CreatorProfile" component={CreatorProfile} />
      <FavoritesScreenNavigator.Screen options={{ animationEnabled: true, headerShown: false }} name="Payments" component={PaymentScreen} />
    </FavoritesScreenNavigator.Navigator>
  );
}

const MyGuides = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: {
          marginBottom: 0.2,
        },
        tabBarLabelStyle: {
          fontWeight: '500'
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#A7A6C6'
        },
        tabBarActiveTintColor: '#A7A6C6',
      }}
    >
        <TopTab.Screen options={{title: "My Guides"}} name="MyGuidesScreen" component={MyGuidesScreen}/>
        <TopTab.Screen name="FavoritesScreen" options={{title: "Favorites"}} component={FavoritesScreen} />
    </TopTab.Navigator>
          
    
  )
}

export default MyGuides