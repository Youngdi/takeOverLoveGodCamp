import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View
} from 'react-native';
import imageFlags from '../constants/imageFlags';
import dayFlags from '../constants/day3';
export default class day3bg extends Component {
    
    render() {
        return (
            <ImageBackground 
              source={dayFlags[this.props.url]}
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
        width: '95%',
        height: null,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
    },
});