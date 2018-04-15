'use strict'
import React from 'react';
import { 
  StyleSheet,
  Platform,
  AsyncStorage
} from 'react-native';
import InitialScreen from '../../components/initialScreen';
import BackgroundImage from '../../components/BackgroundImage';
import Spinner from 'react-native-spinkit';
import { NavigationActions } from 'react-navigation'
import * as Config from '../../constants/config';

async function check_login() {
  
  const isLogined = await AsyncStorage.getItem('@isLogined');
  if (isLogined == "Y") {
    this.props.navigation.navigate('Home');
  } else {
    this.props.navigation.navigate('Login');
  }
}
export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isVisible: true,
      type: 'WanderingCubes',
    };
  }
  componentDidMount() {
    check_login.bind(this)();
    setTimeout(()=>{
      this.setState({
        isVisible: false
      });
    }, 1500);
  }
  render() {
    return(
      <BackgroundImage url={"Galaxy"}>
        <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={100} type={this.state.type} color={'#FFFFFF'}/>
      </BackgroundImage>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginBottom: 50
  },
});