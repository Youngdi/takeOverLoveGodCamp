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
} from 'react-native';

import QRCodeScanner from '../../components/QRCodeScanner';
import { NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ScanScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: '掃寶物',
      titleStyle: {
        textAlign: 'center',
      },
      headerLeft: (
        <Ionicons
            name='ios-arrow-back'
            size={24}
            color='#1c79ff'
            style={{marginLeft:13}}
            onPress={()=>{navigation.goBack();}}
        >
        </Ionicons>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      board: '歡迎進入奇妙的世界！'
    };
  }
  onSuccess(e) {
    this.props.navigation.navigate('TabThreeScreenOne', e);
    /*const setParamsAction = NavigationActions.setParams({
      params: e,
      key: 'TabOneScreenOne',
    });*/
    //this.props.navigation.dispatch(setParamsAction);
    //this.props.navigation.dispatch({type:'JUMP_TO_TAB', payload:{e}});
    // const resetAction = NavigationActions.reset({
    //     index: 0,
    //     actions: [
    //         NavigationActions.navigate({ routeName: 'TabThreeScreenFour'}),
    //         NavigationActions.navigate({ routeName: 'TabThreeScreenOne'})
    //     ]
    //   });
    // this.props.navigation.dispatch(resetAction);
    //Linking.openURL(e.data).catch(err => console.error('An error occured', err));
    //console.log(e);
  }
  topContent() {
    return (
        <Text style={styles.centerText}>
            scan the QR code
        </Text>
    );
  }
  bottomContent() {
    return (
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
    );
  }
  render() {
    return (
        <QRCodeScanner 
            onRead={this.onSuccess.bind(this)} 
            //topContent={this.topContent()} 
            bottomContent={this.bottomContent()}
        />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  },
});