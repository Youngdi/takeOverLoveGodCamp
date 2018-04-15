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
const lockIcon = require("../images/login1_lock.png");
const K_Jewelry = require("../images/modal/K_Jewelry.png");
const Water = require("../images/modal/Water.png");
const Fire = require('../images/modal/fire.png');
const Wood = require('../images/modal/Wood.png');
const Seed = require('../images/modal/Seed.png');
const Stone = require('../images/modal/Rock.png');


const renderPassWordInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput placeholder="關主密碼" placeholderTextColor="#8495a0" style={styles.input} secureTextEntry onChangeText={onChange} {...restInput} />
}
const renderKInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput defaultValue={'0'} keyboardType={'numeric'} placeholder="K寶石" placeholderTextColor="#8495a0"  style={styles.input}  onChangeText={onChange} {...restInput} />
}
const renderFireInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput defaultValue={'0'} keyboardType={'numeric'} placeholder="火寶石" placeholderTextColor="#8495a0"  style={styles.input}  onChangeText={onChange} {...restInput} />
}
const renderWaterInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput defaultValue={'0'} keyboardType={'numeric'} placeholder="水寶石" placeholderTextColor="#8495a0"  style={styles.input}  onChangeText={onChange} {...restInput} />
}
const renderWoodInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput defaultValue={'0'} keyboardType={'numeric'} placeholder="木寶石" placeholderTextColor="#8495a0"  style={styles.input}  onChangeText={onChange} {...restInput} />
}
const renderStoneInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput defaultValue={'0'} keyboardType={'numeric'} placeholder="地寶石" placeholderTextColor="#8495a0"  style={styles.input}  onChangeText={onChange} {...restInput} />
}
const renderSeedInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput defaultValue={'0'} keyboardType={'numeric'} placeholder="種子" placeholderTextColor="#8495a0"  style={styles.input}  onChangeText={onChange} {...restInput} />
}

class GiveScoreDay3 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  return (
      <View style={styles.container}>  
        <View style={styles.inputWrap}>
          <View style={styles.iconWrap}>
            <Image source={K_Jewelry} style={styles.icon} resizeMode="contain" />
          </View>
          <Field name="K" component={renderKInput} />
        </View>
        <View style={styles.inputWrap}>
          <View style={styles.iconWrap}>
            <Image source={Fire} style={styles.icon} resizeMode="contain" />
          </View>
          <Field name="Fire" component={renderFireInput} />
        </View>
        <View style={styles.inputWrap}>
          <View style={styles.iconWrap}>
            <Image source={Water} style={styles.icon} resizeMode="contain" />
          </View>
          <Field name="Water" component={renderWaterInput} />
        </View>
        <View style={styles.inputWrap}>
          <View style={styles.iconWrap}>
            <Image source={Wood} style={styles.icon} resizeMode="contain" />
          </View>
          <Field name="Wood" component={renderWoodInput} />
        </View>
        <View style={styles.inputWrap}>
          <View style={styles.iconWrap}>
            <Image source={Stone} style={styles.icon} resizeMode="contain" />
          </View>
          <Field name="Stone" component={renderStoneInput} />
        </View>
        <View style={styles.inputWrap}>
          <View style={styles.iconWrap}>
            <Image source={Seed} style={styles.icon} resizeMode="contain" />
          </View>
          <Field name="Seed" component={renderSeedInput} />
        </View>
        <View style={styles.inputWrap}>
          <View style={styles.iconWrap}>
            <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
          </View>
          <Field name="password" component={renderPassWordInput} />
        </View>
        <Button
          onPress={this.props.handleSubmit(this.props.Submit)}
          title={'確定給分'}
        >
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
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
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  wrongPasswordText: {
    color: "#D20000",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
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
  form: 'GiveScoreDay3' // a unique name for this form
})(GiveScoreDay3);