'use strict'
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, WebView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class TabOneScreenSix extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      visible: false,
      title:'發問',
      headerTitleStyle:{
        alignSelf: 'center',
        marginLeft: -20,
      },
      headerLeft: (
        <Ionicons.Button name="ios-menu" color="#185ffe" style={{marginLeft:13}} backgroundColor="#eeeef2" onPress={() => navigation.navigate('DrawerOpen')}>
        </Ionicons.Button>
      ),
      drawerLabel: '回饋單填寫',
      drawerIcon: ({ tintColor }) => (
        <Ionicons
          name={'md-document'}
          size={Platform == 'ios' ? 26 : 20}
          style={{ color: tintColor }}
        />
      ),
    }
  };

  render() {
    return(
      <View style={styles.container}>
        <WebView
          ref={'webview'}
          automaticallyAdjustContentInsets={false}
          source={{uri: 'https://billyoungdi.typeform.com/to/cHd1k0'}}
          javaScriptEnabled={true}
          scalesPageToFit={true}
        />
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 25 : 0,
  }
});