'use strict'
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, WebView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
export default class TabOneScreenSeven extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'旌旗教會',
    }
  };
  state = {
    visible: true,
  }
  handleOnLoad = () => this.setState((prevState, props) => ({visible: false}))
  render() {
    return(
      <View style={styles.container}>
        <WebView
          onLoad={this.handleOnLoad}
          ref={'webview'}
          automaticallyAdjustContentInsets={false}
          source={{uri: 'http://www.bannerch.org/'}}
          javaScriptEnabled={true}
          scalesPageToFit={true}
        />
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});