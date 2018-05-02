'use strict'

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Config from '../constants/config';
import drawerFlag from '../constants/drawer';

export default class DrawerItem extends React.Component {

  render() {
    return(
      <View style={{flex:1}}>
        <View style={{width:'100%',height:1,marginTop:25}} />
        {this.props.drawerItems.map((item, i) => (
          <TouchableOpacity
          onPress={() => this.props.navigateTo(item.route, i)}
          >
            <View style={{width:'100%', backgroundColor: this.props.status == i ? '#EBEBEB' : 'transparent', height:60, marginBottom:0, display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
              <Ionicons
                name={`${item.iconName}`}
                size={Platform.OS == 'ios' ? 28 : 20}
                style={{ color: this.props.status == i ? '#2196F3' : '#777', width:30, height:30, marginLeft:20, marginRight:30 }}
              />
              <Text style={{fontSize:16, color: this.props.status == i ? '#2196F3' : '#777'}}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}
