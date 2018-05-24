import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, WebView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
export default class Questionnaire extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'填寫回饋單',
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
          source={{uri: 'https://billyoungdi.typeform.com/to/vbGRv7'}}
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