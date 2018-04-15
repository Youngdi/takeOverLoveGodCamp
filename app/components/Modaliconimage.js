import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import imageFlags from '../constants/imageFlags';
export default class modaliconimage extends Component {
    
    render() {
        return (
            <Image 
              source={imageFlags[this.props.url]}
              style={this.props.page4 ? styles.Page4_backgroundImage : styles.Page1_backgroundImage}
            >
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    Page4_backgroundImage: {
        width: 30,
        height: 30,
        marginRight:4,
    },
    Page1_backgroundImage: {
        width: 50,
        height: 50,
    },
});