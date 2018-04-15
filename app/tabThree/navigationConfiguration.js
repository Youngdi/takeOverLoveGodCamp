'use strict'
import { StackNavigator } from 'react-navigation';
// Screens
import TabThreeScreenOne from './views/TabThreeScreenOne';
import TabThreeScreenTwo from './views/TabThreeScreenTwo';
import TabThreeScreenThree from './views/TabThreeScreenThree';
import TabThreeScreenFour from './views/TabThreeScreenFour';

const routeConfiguration = {
  TabThreeScreenOne: { screen: TabThreeScreenOne },
  TabThreeScreenTwo: { screen: TabThreeScreenTwo },
  TabThreeScreenThree: { screen: TabThreeScreenThree },
  TabThreeScreenFour: { screen: TabThreeScreenFour,  },
}
// going to disable the header for now
const stackNavigatorConfiguration = {
  initialRoute: 'TabThreeScreenOne',
  headerMode: 'none',
}

export const NavigatorTabThree = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
