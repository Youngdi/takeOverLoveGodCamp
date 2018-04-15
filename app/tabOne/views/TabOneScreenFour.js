'use strict'
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Platform } from 'react-native';
import BackgroundImage from '../../components/BackgroundImage';
export default class TabOneScreenFour extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      visible: false,
      title:'國家歷史',
      headerTitleStyle:{
        alignSelf: 'center',
        marginLeft: -20,
      },
      headerLeft: (
        <Ionicons.Button name="ios-menu" color="#185ffe" style={{marginLeft:13}}backgroundColor="#eeeef2" onPress={() => navigation.navigate('DrawerOpen')}>
        </Ionicons.Button>
      ),
      drawerLabel: '國家歷史',
      drawerIcon: ({ tintColor }) => (
        <Ionicons
          name={'md-flag'}
          size={Platform == 'ios' ? 26 : 20}
          style={{ color: tintColor }}
        />
      ),
    }
  };

  render(){
    return(
      <ScrollView>
        <View style={{backgroundColor:'#ecead9'}}>
          <Image
            style={styles.backgroundImage}
            source={require('../../images/TakeOver_History.png')}
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