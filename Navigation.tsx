import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import CameraView from './screens/Camera';
import Preview from './screens/Preview';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CameraView" component={CameraView} />
      <Stack.Screen name="Preview" component={Preview} />
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
