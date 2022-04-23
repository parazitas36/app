import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import UserGuides from './UserGuides';
import Favorites from './Favorites';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const TopTab = createMaterialTopTabNavigator();

const MyGuides = () => {
  return (
    <TopTab.Navigator>
        <TopTab.Screen options={{title: "My Guides"}} name="MyGuides" component={UserGuides}/>
        <TopTab.Screen name="Favorites" component={Favorites} />
    </TopTab.Navigator>
          
    
  )
}

export default MyGuides