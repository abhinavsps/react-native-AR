/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Linking,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import DeepARView, {
  Camera,
  CameraPermissionRequestResult,
  CameraPositions,
  IDeepARHandle,
} from 'react-native-deepar';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Navigation from './Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    const microphonePermission = await Camera.requestMicrophonePermission();

    const isCameraAllowed =
      cameraPermission === CameraPermissionRequestResult.AUTHORIZED;
    const isMicrophoneAllowed =
      microphonePermission === CameraPermissionRequestResult.AUTHORIZED;

    if (isCameraAllowed && isMicrophoneAllowed) {
      // setPermsGranted(true);
    } else {
      Alert.alert(
        'Permission required',
        'Please give permission for Camera and microphone from Settings',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Ok',
            onPress: () => Linking.openSettings(),
          },
        ],
      );
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
