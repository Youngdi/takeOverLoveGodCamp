'use strict'

import React from 'react';
import { View, Text, Image, StyleSheet, Platform, ScrollView, AsyncStorage, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Config from '../constants/config';
import drawerFlag from '../constants/drawer';
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  DrawerContainer: {
    flex:1,
    backgroundColor: 'white'
  },
  drawerHeader: {
    flex:1
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
      url: require('../images/drawerBarIcon/DrawerBar_01-01.png'),
      status: 0,
      drawerItems: [
        {route:'HomeTab', name:'首頁', iconName:'md-home'},
        {route:'Workshop', name:'工作坊', iconName:'md-construct'},
        {route:'Schedule', name:'行程表', iconName:'md-clipboard'},
        {route:'History', name:'國家歷史', iconName:'md-flag'},
        {route:'HelpInfo', name:'疑難雜症要找誰', iconName:'md-help'},
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
        this.props.navigation.navigate('Login');
        AsyncStorage.setItem('@isLogined', 'N');
        fetch(`https://${Config.SERVER_IP}:${Config.PORT}/logout`);
      } else if (route == 'HomeTab') {
        this.setState({status:0});
        this.props.closeControlPanel();
      } else {
        this.setState({status: status});
        this.props.navigation.navigate(route);
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
          <View style={{flex:1}}>
            <View style={{width:'100%',height:1,marginTop:25}}></View>
            {this.state.drawerItems.map((item, i) => (
              <TouchableOpacity
              onPress={() => this.navigateTo(item.route, i)}
              >
                <View style={{width:'100%', backgroundColor: this.state.status == i ? '#EBEBEB' : 'transparent', height:60, marginBottom:0, display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                  <Ionicons
                    name={`${item.iconName}`}
                    size={Platform.OS == 'ios' ? 28 : 20}
                    style={{ color: this.state.status == i ? '#2196F3' : '#777', width:30, height:30, marginLeft:20, marginRight:30 }}
                  />
                  <Text style={{fontSize:16, color: this.state.status == i ? '#2196F3' : '#777'}}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    )
  }
}
