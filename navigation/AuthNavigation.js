import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Analytics from '../screens/Analytics';
import Notifications from '../screens/Notifications';

const AuthNavigation = props => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Notifications" component={Notifications}/>
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AuthNavigation;
