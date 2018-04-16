'use strict'

import React from 'react';
import { View, Text, Image, StyleSheet, Platform, ScrollView, AsyncStorage, Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
import * as Config from '../constants/config';
import drawerFlag from '../constants/drawer';
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  DrawerContainer: {
    flex:1,
    marginTop: Platform == "ios" ? 25 : 0,
    backgroundColor: 'white'
  },
  drawerHeader: {
    flex:1
  },
  drawerIconContainer:{
    marginTop: Platform == "ios" ? 25 : 0,
    height: (height < 540) ? 125 : 200,
    width: '100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgb(165,186,194)'
  },
  drawerIcon: {
      width:  (height < 540) ? 175 : 225,
      height: (height < 540) ? 175 : 225,
  },
});

export default class DrawerItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View></View>
    )
  }
}
