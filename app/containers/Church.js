'use strict'
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, WebView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class TabOneScreenSeven extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'旌旗教會',
    }
  };

  render() {
    return(
      <View style={styles.container}>
        <WebView
          ref={'webview'}
          automaticallyAdjustContentInsets={false}
          source={{uri: 'http://www.bannerch.org/'}}
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
  }
});