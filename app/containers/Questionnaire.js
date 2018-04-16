import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, WebView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Questionnaire extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'填寫回饋單',
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
  }
});