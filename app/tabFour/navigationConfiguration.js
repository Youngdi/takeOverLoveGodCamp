'use strict'
import { StackNavigator } from 'react-navigation';
// Screens
import TabFourScreenOne from './views/TabFourScreenOne';
import TabFourScreenTwo from './views/TabFourScreenTwo';

const routeConfiguration = {
  TabFourScreenOne: { screen: TabFourScreenOne },
  TabFourScreenTwo: { screen: TabFourScreenTwo },
}
// going to disable the header for now
const stackNavigatorConfiguration = {
  //headerMode: 'none',
  initialRouteName: 'TabFourScreenOne',
  headerMode: 'none',
}

export const NavigatorTabFour = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
