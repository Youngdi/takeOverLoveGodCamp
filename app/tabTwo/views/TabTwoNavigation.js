'use strict'
// React
import React from 'react';
import { Platform, StyleSheet, Image } from 'react-native';
// Navigation
import { addNavigationHelpers } from 'react-navigation';
import { NavigatorTabTwo } from '../navigationConfiguration';
//Redux
import { connect } from 'react-redux';
// Icon
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mapStateToProps = (state) => {
 return {
    navigationState: state.tabTwo,
    form: state.form,
  }
}
class TabTwoNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: '解謎',
    tabBarIcon: ({ tintColor, focused }) => (
      <Image
        source={require('../../images/tabIcons/grid-01.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    )
  }
  render() {
    const { dispatch, navigationState} = this.props
    return (
      <NavigatorTabTwo
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}

export default connect(mapStateToProps)(TabTwoNavigation)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});