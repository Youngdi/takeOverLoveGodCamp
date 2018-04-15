import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

const { width, height } = Dimensions.get("window");

const background = require("../images/TakeOver_Login.png");
const mark = require("../images/login1_mark.png");
const lockIcon = require("../images/login1_lock.png");
const personIcon = require("../images/login1_person.png");

const renderNameInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput placeholder="Username" placeholderTextColor="#FFF" style={styles.input} onChangeText={onChange} {...restInput} />
}
const renderPassWordInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput  placeholder="Password" placeholderTextColor="#FFF" style={styles.input} secureTextEntry onChangeText={onChange} {...restInput} />
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  // const { handleSubmit } = this.props
  render() {
  return (
      <View style={styles.container}>
        <Image source={background} style={styles.background} resizeMode="cover">
          <View style={{height:height * 0.35,width:1}}>
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <Field name="username" component={renderNameInput} />
            </View>
            <View style={styles.inputWrap}>
              <Field name="password" component={renderPassWordInput} />
            </View>
            <TouchableOpacity activeOpacity={.5} onPress={() => Alert.alert('去問你的隊輔XD')}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
            {(this.props.wrong) && (<TouchableOpacity activeOpacity={.5}><View><Text style={styles.wrongPasswordText}>帳號或密碼錯誤</Text></View></TouchableOpacity>)}
            <TouchableOpacity activeOpacity={.5} onPress={this.props.handleSubmit(this.props.Submit)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Log in</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={this.props.tryforfun.bind(this)}>
              <View>
                <Text style={styles.loginforfun}>體驗帳號登入</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
            </View>
          </View>
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 40,
    justifyContent:'center',
    alignItems:'center',
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width:'70%',
    // borderBottomWidth: 1,
    // borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize:18
  },
  button: {
    backgroundColor: "rgba(255,255,255,0)",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingLeft: 140,
  },
  loginforfun: {
    marginTop:50,
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 0,
  },
  wrongPasswordText: {
    color: "#D20000",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingLeft: 140,
    marginTop:5,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});

// Decorate the form component
export default reduxForm({
  form: 'Login' // a unique name for this form
})(LoginForm);