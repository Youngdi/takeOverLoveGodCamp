import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get("window");
export default class landBG extends Component {
    render() {
        return (
            <Image 
              source={require('../images/land/bg.png')}
              style={styles.backgroundImage}
              resizeMode={'contain'}
            >
            {this.props.children}
            </Image>
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
        marginTop: height < 600 ? 0 : -40,
    },
});