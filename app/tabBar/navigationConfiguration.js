'use strict'
import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions, TabView, TabBarBottom } from 'react-navigation';
// Tab-Navigators
import TabOneNavigation from '../tabOne/views/TabOneNavigation';
import TabTwoNavigation from '../tabTwo/views/TabTwoNavigation';
import TabThreeNavigation from '../tabThree/views/TabThreeNavigation';
import TabFourNavigation from '../tabFour/views/TabFourNavigation';
import LoginScreen from './views/LoginScreen';
import SplashScreen from './views/SplashScreen';

const TabrouteConfiguration = {
  TabOneNavigation: { screen: TabOneNavigation },
  TabTwoNavigation: { screen: TabTwoNavigation },
  TabThreeNavigation: { screen: TabThreeNavigation },
  TabFourNavigation : { screen: TabFourNavigation },
}

const tabBarConfiguration = {
  ...TabNavigator.Presets.AndroidTopTabs,
  tabBarComponent: props => {
    const {navigation, navigationState} = props
    const jumpToIndex = index => {
      const lastPosition = navigationState.index;
      const tab = navigationState.routes[index];
      const tabRoute = tab.routeName;
      const tabAction = NavigationActions.navigate({ routeName: tabRoute });
      if (lastPosition === index && tabRoute === 'TabOneNavigation') {
        const HomeAction = NavigationActions.navigate({ routeName: 'TabOneDrawerOne' });
        navigation.dispatch(HomeAction);
      }
      if (lastPosition === index && tabRoute === 'TabThreeNavigation') {
        const HomeAction = NavigationActions.navigate({ routeName: 'TabThreeScreenOne' });
        navigation.dispatch(HomeAction);
      }
      lastPosition !== index && navigation.dispatch(tabAction);
    }
    return <TabBarBottom {...props} jumpToIndex={jumpToIndex}/>
  },
  swipeEnabled: false,
  lazyLoad: true,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#fff' : '#fff',
    labelStyle: {
        fontSize: 12,
        color: '#eff0f4',
    },
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: '#2c2f30',
      borderTopWidth: 3,
      borderTopColor: 'rgba(83,83,83,0.1)',
    },
    tabStyle: {
      borderRightWidth: 1,
      borderRightColor: 'white',
    },
    indicatorStyle: {
      backgroundColor: '#2c2f30',
    }
  }
}
const Home = TabNavigator(TabrouteConfiguration, tabBarConfiguration)

const StackrouteConfiguration = {
  Splash: { screen: SplashScreen },
  Home: { screen: Home },
  Login: { screen: LoginScreen },
}
const StackConfiguration = {
  initialRouteName:'Splash',
  headerMode: 'none',
  navigationOptions:{
    gesturesEnabled: false,
  },
}
export const TabBar = StackNavigator(StackrouteConfiguration, StackConfiguration);

