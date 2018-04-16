'use strict'
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class History extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'國家歷史',
    }
  };

  render(){
    return(
      <ScrollView>
        <View style={{backgroundColor:'#ecead9'}}>
          <Image
            style={styles.backgroundImage}
            source={require('../images/TakeOver_History.png')}
            resizeMode={'contain'}
          ></Image>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: 1300,
    },
});