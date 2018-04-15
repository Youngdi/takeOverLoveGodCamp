'use strict'

// React
import React from 'react';

// Navigation
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { TabBar } from '../navigationConfiguration';
import { BackHandler, BackAndroid, Platform } from 'react-native'; 
// Redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
 return {
  navigationState: state.tabBar,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      //note: bindActionCreators(NoteActions, dispatch),
    },
    dispatch,
  };
}

class TabBarNavigation extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    if (this.props.navigationState.index) {
      this.props.dispatch({type: "Navigation/BACK"})
      return true;
    } else {
      return false;
    }
  };
  render(){
    const { dispatch, navigationState } = this.props
    return (
      <TabBar
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
          })
        }
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBarNavigation);


