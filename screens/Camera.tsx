import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import DeepARView, {CameraPositions, IDeepARHandle} from 'react-native-deepar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {images} from '../src/contants/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {effects} from '../src/contants/effects';

const CameraView = () => {
  const deepARRef = useRef<IDeepARHandle>(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    deepARRef?.current?.switchEffect({
      mask: effects[activeIndex]?.name as string,
      slot: 'effect',
    });
    //   deepARRef?.current?.switchEffect({
    //     mask: effects[activeIndex]?.name as string,
    //     slot: 'mask',
    //   });
  }, [activeIndex]);

  const changeEffect = (direction: number) => {
    if (!deepARRef) {
      return;
    }

    let newIndex = direction > 0 ? activeIndex + 1 : activeIndex - 1;

    if (newIndex >= effects.length) {
      newIndex = 0;
    }

    if (newIndex < 0) {
      newIndex = effects.length - 1;
    }

    // const newEffect = effects[newIndex];

    // if (newEffect?.platforms.includes(Platform.OS)) {
    //   deepARRef?.current?.switchEffect({
    //     mask: newEffect?.name as string,
    //     slot: 'effect',
    //   });
    // } else {
    //   deepARRef?.current?.switchEffect({
    //     mask: Effects[0]?.name as string,
    //     slot: 'effect',
    //   });
    // }

    setActiveIndex(newIndex);
  };

  const renderBottom = () => {
    return (
      <View style={styles.bottomAbsView}>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={styles.nextPrevBackground}
            onPress={() => changeEffect(-1)}>
            <Image source={images.left} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureView} />
          <TouchableOpacity
            style={styles.nextPrevBackground}
            onPress={() => changeEffect(1)}>
            <Image source={images.right} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textCenter}>{effects?.[activeIndex]?.title}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-start',
          marginLeft: 20,
        }}
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
          console.log('Initiated');
        }}
        position={CameraPositions.FRONT}
        onError={(text, type) => {
          console.log('onError =>', text, 'type =>', type);
        }}
      />
      {renderBottom()}
    </View>
  );
};

export default CameraView;

const styles = StyleSheet.create({
  bottomAbsView: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    zIndex: 100,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textCenter: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  captureView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  nextPrevBackground: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 4,
  },
});
