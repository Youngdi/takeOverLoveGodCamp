'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  TouchableOpacity,
  Linking,
  Platform,
  Alert
} from 'react-native';
import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';
import { NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Scan extends Component {
  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: '掃寶物',
    };
  };
  constructor(props){
    super(props);
    this.state = {
      checkScanOnce: false,
    }
  }
  onSuccess = (value) => {
    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({routeName: "HomeTab", params: {data: value }}),
    //   ],
    // });
    // this.props.navigation.dispatch(resetAction);
    if(this.state.checkScanOnce) {
      return 
    } else {
      this.setState({
        checkScanOnce: true,
      });
      this.props.navigation.goBack();
      setTimeout(() => {
        this.props.navigation.state.params.getEgg(value);
      }, 100);
    }
  }
  render() {
    return (
      <CameraKitCameraScreen
        scanBarcode={true}
        // laserColor={"blue"}
        // frameColor={"yellow"}
        onReadCode={((event) => this.onSuccess(event.nativeEvent.codeStringValue))}
        hideControls={true}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
        showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
        offsetForScannerFrame = {10}   //(default 30) optional, offset from left and right side of the screen
        heightForScannerFrame = {400}  //(default 200) optional, change height of the scanner frame
        colorForScannerFrame = {'red'} //(default white) optional, change colot of the scanner frame
      />
    )
  }
}
