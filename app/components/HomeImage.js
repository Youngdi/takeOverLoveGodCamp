import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground
} from 'react-native';
import imageFlags from '../constants/imageFlags';
export default class Modaliconimage extends Component {
    render() {
        return (
            <ImageBackground 
              source={imageFlags[this.props.url]}
              style={styles.backgroundImage}
            >
            <Text onPress={() => this.props.navigation.navigate('DrawerOpen')} style={{width:100, height:50, backgroundColor:'rgba(255,255,255,0)'}}>{' '}</Text>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
});