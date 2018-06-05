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
  Alert,
  KeyboardAvoidingView
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
        NavigationActions.navigate({routeName:'HomeTab', key:'HomeTab'}),
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
      setTimeout(() => {
        this.setState({
          visible: false,
          wrong: false,
        });
      }, 800);
      setTimeout(() => {
        this.props.navigation.dispatch(resetAction);
      }, 1000);
    } else {
      this.setState({
        visible: false,
        wrong: true,
      });
    }
  } catch(error) {
    alert('不好意思，你網路不穩或是伺服器已關閉，明年請儘早報名變強好不好夏令營');
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
        NavigationActions.navigate({routeName:'HomeTab',key:'HomeTab'}),
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
      setTimeout(() => {
        this.setState({
          visible: false,
          wrong: false,
        });
      }, 800);
      setTimeout(() => {
        this.props.navigation.dispatch(resetAction);
      }, 1000);
    } else {
      this.setState({
        visible: false,
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
      visible: true,
    });
    login.bind(this, {
      username: this.state.username,
      password: this.state.password
    })();
  }
  tryforfun() {
    this.setState({
      visible: true,
    });
    loginForFun.bind(this)();
  }
  render() {
    return (
      <KeyboardAvoidingView style={[styles.container]}>
        <LoginForm
          onChangeUsername={this.onChangeUsername}
          onChangePassword={this.onChangePassword}
          tryforfun={this.tryforfun.bind(this)}
          submit={this.submit.bind(this)}
          wrong={this.state.wrong}
        />
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </KeyboardAvoidingView>
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