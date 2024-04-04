import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import DeepARView, {CameraPositions, IDeepARHandle} from 'react-native-deepar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {images} from '../src/contants/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const CameraView = () => {
  const deepARRef = useRef<IDeepARHandle>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <TouchableOpacity
        style={{alignSelf: 'flex-start', marginLeft: 20}}
        onPress={() => navigation.goBack()}>
        <Image source={images.backIcon} />
      </TouchableOpacity>
      <DeepARView
        ref={deepARRef}
        apiKey={
          Platform.OS === 'android'
            ? 'd0eb849b2329514e1b37ae418866679080c19ff77ce9ec3070a22a5a2d3e532ed206e107a2349ee3'
            : '9735a0722435ff0031040c394edf9798a1a5be7b8c2159581591cb1c92790e5f6caf5df183b8ec69'
        }
        style={{flex: 1}}
        onInitialized={() => {
          console.log('INITIALIZED');
        }}
        position={CameraPositions.FRONT}
        onError={(text, type) => {
          console.log('onError =>', text, 'type =>', type);
        }}
      />
    </View>
  );
};

export default CameraView;

const styles = StyleSheet.create({});
