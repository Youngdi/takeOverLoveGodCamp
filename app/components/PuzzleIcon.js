import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import imageFlags from '../constants/imageFlags';
export default class PuzzleIcon extends Component {
    
    render() {
        return (
            <Image 
              source={imageFlags[this.props.url]}
              style={styles.backgroundImage}
            >
            {this.props.children}
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%'
    },
});