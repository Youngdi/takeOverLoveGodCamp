'use strict'
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Dimensions, Platform, ScrollView, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get("window");

export default class Schedule extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'行程表',
    }
  };
  render() {
    return(
      <ScrollView>
        <Image
          resizeMode='contain'
          style={{width:width, height: height}}
          source={require('../images/schdule1.jpg')}
        ></Image>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 32
    }
});
