'use strict'
import React from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Platform,
  TextInput,
  Button,
  AsyncStorage,
  Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as Config from '../constants/config';
import LoginForm from '../components/LoginForm';
import Spinner from 'react-native-loading-spinner-overlay';
import { api_login } from '../api/api';
async function login(value) {
  try {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName:'HomeTab'}),
      ],
    });
    const response = await api_login(value);
    if (response.loggedIn) {
      try {
        await AsyncStorage.setItem('@isLogined', 'Y');
        await AsyncStorage.setItem('@UserCountry', response.user[0].country);
        await AsyncStorage.setItem('@UserName', response.user[0].name);
        await AsyncStorage.setItem('@jwtToken', response.myToken);
      } catch (error) {
        console.log(error);
      }
      this.setState({
        visible: !this.state.visible,
        wrong: false,
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      this.setState({
        visible: !this.state.visible,
        wrong: true,
      });
    }
  } catch(error) {
    alert('不好意思，伺服器已關閉，明年請儘早報名變強好不好夏令營');
    // this.setState({
    //   visible: !this.state.visible
    // });
  }
}
async function loginForFun() {
  try {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName:'HomeTab'}),
      ],
    });
    const value = {username:'BYT30', password:'A23456'};
    const response = await api_login(value);
    if (response.loggedIn) {
      try {
        await AsyncStorage.setItem('@isLogined', 'Y');
        await AsyncStorage.setItem('@UserCountry', response.user[0].country);
        await AsyncStorage.setItem('@UserName', response.user[0].name);
        await AsyncStorage.setItem('@jwtToken', response.myToken);
      } catch (error) {
        console.log(error);
      }
      this.setState({
        visible: !this.state.visible,
        wrong: false,
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      this.setState({
        visible: !this.state.visible,
        wrong: true,
      });
    }
  } catch(error) {
    this.setState({
      visible: !this.state.visible
    });
    alert('不好意思，伺服器已關閉，明年請儘早報名變強好不好夏令營');
  }
}


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      wrong: false,
      username: '',
      password: '',
    }
  }
  onChangeUsername = (name) => {
    this.setState({
      username: name,
    })
  }
  onChangePassword = (pwd) => {
    this.setState({
      password: pwd,
    })
  }
  submit() {
    this.setState({
      visible: !this.state.visible
    });
    login.bind(this, {
      username: this.state.username, password: this.state.password
    })();
  }
  tryforfun() {
    this.setState({
      visible: !this.state.visible
    });
    loginForFun.bind(this)();
  }
  render() {
    return (
      <ScrollView style={[styles.container]}>
        <LoginForm
          onChangeUsername={this.onChangeUsername}
          onChangePassword={this.onChangePassword}
          tryforfun={this.tryforfun.bind(this)}
          submit={this.submit.bind(this)}
          wrong={this.state.wrong}
        />
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginforfun: {
    marginTop:30,
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
});