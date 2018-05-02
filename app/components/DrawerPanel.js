'use strict'

import React from 'react';
import { View, Text, Image, StyleSheet, Platform, ScrollView, AsyncStorage, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
import * as Config from '../constants/config';
import drawerFlag from '../constants/drawer';
import DraweItems from './DrawerItems';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  DrawerContainer: {
    flex:1,
    backgroundColor: 'white'
  },
  drawerIconContainer:{
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

export default class SideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      status: 0,
      drawerItems: [
        {route:'HomeTab', name:'首頁', iconName:'md-home'},
        {route:'Workshop', name:'工作坊', iconName:'md-construct'},
        {route:'Schedule', name:'行程表', iconName:'md-clipboard'},
        {route:'History', name:'國家歷史', iconName:'md-flag'},
        // {route:'HelpInfo', name:'疑難雜症要找誰', iconName:'md-help'},
        {route:'Questionnaire', name:'回饋單填寫', iconName:'md-document'},
        {route:'Church', name:'旌旗教會資訊', iconName:'md-people'},
        {route:'Logout', name:'登出', iconName:'md-power'}
      ]
    }
    setTimeout(() => {
      this.init();
    }, 1500)
  }
  async init() {
    const userCountry = await AsyncStorage.getItem('@UserCountry');
    const username = await AsyncStorage.getItem('@UserName');
    this.setState({
      url: drawerFlag[username],
    })
  }
  navigateTo = async (route, status) => {
    try {
      if (route == 'Logout') {
        this.setState({status:0});
        this.props.navigation.navigate({routeName: 'Login', key: 'Login'});
        AsyncStorage.setItem('@isLogined', 'N');
        fetch(`https://${Config.SERVER_IP}:${Config.PORT}/logout`);
      } else if (route == 'HomeTab') {
        this.setState({status:0});
        this.props.closeControlPanel();
      } else {
        this.setState({status: status});
        this.props.navigation.navigate({routeName: route, key: route});
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  render() {
    return(
      <ScrollView>
        <View style={styles.DrawerContainer}>
          <View style={styles.drawerIconContainer}>
            <Image  
              source={this.state.url}
              style={styles.drawerIcon}
              resizeMode={'contain'}
            />
          </View>
          <DraweItems
            drawerItems={this.state.drawerItems}
            navigateTo={this.navigateTo}
            status={this.state.status}
          />
        </View>
      </ScrollView>
    )
  }
}
