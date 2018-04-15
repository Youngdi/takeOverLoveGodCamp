'use strict'

import React from 'react';
import { View, Text, Image, StyleSheet, Platform, ScrollView, AsyncStorage, Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
// Screens
import TabOneScreenOne from './views/TabOneScreenOne';
import TabOneScreenTwo from './views/TabOneScreenTwo';
import TabOneScreenThree from './views/TabOneScreenThree';
import TabOneScreenFour from './views/TabOneScreenFour';
import TabOneScreenFive from './views/TabOneScreenFive';
import TabOneScreenSix from './views/TabOneScreenSix';
import TabOneScreenSeven from './views/TabOneScreenSeven';
import TabOneScreenEight from './views/TabOneScreenEight.js';
import * as Config from '../constants/config';
import drawerFlag from '../constants/drawer';
const { width, height } = Dimensions.get("window");
class SideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: require('../images/A.png'),
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
      
        <DrawerItems {...this.props} 
          onItemPress={(route) => {
            if (route.route.routeName === 'TabOneDrawerEight') {
              AsyncStorage.setItem('@isLogined', 'N');
              fetch(`https://${Config.SERVER_IP}:${Config.PORT}/logout`);
              this.props.navigation.navigate('DrawerClose');
              this.props.navigation.navigate('Login');
            } else {
              this.props.navigation.navigate('DrawerClose');
              this.props.navigation.navigate(route.route.routeName);
            }
          }}/>
      </View>
      </ScrollView>
    )
  }
}

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
const stackNavigatorConfiguration = {
  headerMode: 'none',
}
const tabOneDrawerOne = StackNavigator({
  TabOneScreenOne: { screen: TabOneScreenOne },
  },
  stackNavigatorConfiguration
);

const tabOneDrawerTwo = StackNavigator({
  TabOneScreenTwo: { screen: TabOneScreenTwo },
  },
  stackNavigatorConfiguration
);

const tabOneDrawerThree = StackNavigator({
  TabOneScreenThree: { screen: TabOneScreenThree },
  },
  stackNavigatorConfiguration
);

const tabOneDrawerFour = StackNavigator({
  TabOneScreenFour: { screen: TabOneScreenFour },
  },
  stackNavigatorConfiguration
);
const tabOneDrawerFive = StackNavigator({
  TabOneScreenFour: { screen: TabOneScreenFive },
  },
  stackNavigatorConfiguration
);
const tabOneDrawerSix = StackNavigator({
  TabOneDrawerSix: { screen: TabOneScreenSix },
  },
  stackNavigatorConfiguration
);
const tabOneDrawerSeven = StackNavigator({
  TabOneDrawerSeven: { screen: TabOneScreenSeven },
  },
  stackNavigatorConfiguration
);
const tabOneDrawerEight = StackNavigator({
  TabOneDrawerEight: { screen: TabOneScreenEight },
  },
  stackNavigatorConfiguration
);
const routeConfiguration = {
  TabOneDrawerOne: { screen: tabOneDrawerOne },
  TabOneDrawerTwo: { screen: tabOneDrawerTwo },
  TabOneDrawerThree: { screen: tabOneDrawerThree },
  TabOneDrawerFour: { screen: tabOneDrawerFour },
  TabOneDrawerFive: { screen: tabOneDrawerFive },
  TabOneDrawerSix: { screen: tabOneDrawerSix },
  TabOneDrawerSeven: { screen: tabOneDrawerSeven },
  TabOneDrawerEight: { screen: tabOneDrawerEight },
}
// const routeConfiguration = {
//   TabOneDrawerOne: { screen: tabOneDrawerOne },
//   TabOneDrawerTwo: { screen: tabOneDrawerTwo },
//   TabOneDrawerThree: { screen: tabOneDrawerThree },
//   TabOneDrawerFour: { screen: tabOneDrawerFour },
//   TabOneDrawerFive: { screen: tabOneDrawerFive },
//   TabOneDrawerSix: { screen: tabOneDrawerSix },
// }
// going to disable the header for now
const DrawerNavigatorConfiguration = {
  initialRouteName: 'TabOneDrawerOne',
  contentComponent: SideDrawer,
}
export const NavigatorTabOne = DrawerNavigator(routeConfiguration, DrawerNavigatorConfiguration);