import React, { Component } from 'react';
import { Button, ScrollView, Text, View, TouchableOpacity, Animated, StyleSheet, Share, Platform, Image } from 'react-native';
import { SafeAreaView, StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EasterEggHunterScreen from './EasterEggHunt.js';
import HomeScreen from './Home';
import LandScreen from './Land';
import PuzzleGameScreen from './PuzzleGame';
import SplashScreen from './Splash';
import LoginScreen from './Login';
import WorkshopScreen from './Workshop';
import HistoryScreen from './History';
import HelpInfoScreen from './HelpInfo';
import ScheduleScreen from './Schedule';
import QuestionnaireScreen from './Questionnaire';
import ChurchScreen from './Church';
import ScanScreen from './Scan';
import RobotChatScreen from './RobotChat';

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});
const HomeTabNav = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      path: '/',
      navigationOptions: {
        title: '首頁',
        tabBarLabel: '首頁',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            source={require('../images/tabIcons/castle-01.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      },
    },
    PuzzleGame: {
      path: '/puzzle',
      screen: PuzzleGameScreen,
      navigationOptions: {
        title: '九宮格解謎',
        tabBarLabel: '解謎',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            source={require('../images/tabIcons/grid-01.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      },
    },
    EasterEggHunter: {
      path: '/easterEggHunter',
      screen: EasterEggHunterScreen,
      navigationOptions: {
        title: '尋寶獵人',
        tabBarLabel: '尋寶',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            source={require('../images/tabIcons/map-01.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      },
    },
    Land: {
      path: '/lang',
      screen: LandScreen,
      navigationOptions: {
        title: '領土爭奪',
        tabBarLabel: '領土爭奪',
        tabBarIcon: ({ tintColor, focused }) => (
          <Image
            source={require('../images/tabIcons/banner-01.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        )
      },
    },
  },
  {
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
      indicatorStyle: {
        backgroundColor: '#2c2f30',
      }
    }
  }
);

const App = StackNavigator(
{
  Root: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  HomeTab: {
    screen: HomeTabNav,
    navigationOptions: {
      header: null,
    },
  },
  Scan: {
    screen: ScanScreen,
  },
  RobotChat: {
    screen: RobotChatScreen,
  },
  Workshop: {
    screen: WorkshopScreen,
  },
  Schedule: {
    screen: ScheduleScreen,
  },
  History: {
    screen: HistoryScreen,
  },
  HelpInfo: {
    screen: HelpInfoScreen,
  },
  Questionnaire: {
    screen: QuestionnaireScreen,
  },
  Church: {
    screen: ChurchScreen,
  }
},
  {
    transitionConfig: getSlideFromRightTransition,
    headerMode: 'screen'
  }
);

export default App;
