import React, { Component } from 'react';
import { Button, ScrollView, Text, View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import I18n, { getLanguages } from 'react-native-i18n';

export default class Bible extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <View><Button title="b" onPress={() => this.props.navigation.navigate('Diary')}></Button></View>
      );
    }
  }