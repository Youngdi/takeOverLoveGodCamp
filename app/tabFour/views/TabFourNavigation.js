'use strict'

// React
import React from 'react';
import { Platform, StyleSheet, Image } from 'react-native';
// Navigation
import { addNavigationHelpers } from 'react-navigation';
import { NavigatorTabFour } from '../navigationConfiguration';
import { goSecond } from '../../actions/tabOneAction';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Icon
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mapStateToProps = (state) => {
  return {
    navigationState: state.tabFour
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      goSecond: bindActionCreators(goSecond, dispatch),
    },
    dispatch,
  };
}
class TabFourNavigation extends React.Component {
  static navigationOptions = {
    tabBarLabel: '領土爭奪',
    tabBarIcon: ({ tintColor, focused }) => (
      <Image
        source={require('../../images/tabIcons/banner-01.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    )
  }

  render(){
    const { navigationState, dispatch, actions } = this.props
    return (
      <NavigatorTabFour
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            actions: actions,
            state: navigationState
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabFourNavigation)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});