'use strict'

import { StackNavigator } from 'react-navigation';

// Screens
import TabTwoScreenOne from './views/TabTwoScreenOne';
import TabTwoScreenTwo from './views/TabTwoScreenTwo';
//import { Header } from 'react-navigation-native-base';

const routeConfiguration = {
  TabTwoScreenOne: { screen: TabTwoScreenOne },
  TabTwoScreenTwo: { screen: TabTwoScreenTwo },
}
// going to disable the header for now

const stackNavigatorConfiguration = {
  initialRoute: 'TabTwoScreenOne',
  headerMode: 'none',
}

export const NavigatorTabTwo = StackNavigator(routeConfiguration, stackNavigatorConfiguration);
