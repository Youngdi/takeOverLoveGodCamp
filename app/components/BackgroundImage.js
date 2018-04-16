import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground
} from 'react-native';
import imageFlags from '../constants/imageFlags';
export default class BackgroundImage extends Component {
    
    render() {
        return (
            <ImageBackground 
              source={imageFlags[this.props.url]}
              style={styles.backgroundImage}
            >
            {this.props.children}
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        alignItems:'center',
        justifyContent:'center',
    },
});