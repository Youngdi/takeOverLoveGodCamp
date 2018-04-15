import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import PuzzleIcon from '../components/PuzzleIcon';
import imageFlags from '../constants/imageFlags';
const { width, height } = Dimensions.get("window");
export default class Puzzle extends Component {
    render() {
      let BgColor = "";
      if(this.props.P_result == 'W') BgColor = "red"
      if(this.props.P_result == 'L') BgColor = "blue"
      if(this.props.P_result == 'N') BgColor = "yellow"
        return (
            <TouchableOpacity
              onPress={this.props.onClick}
              style={{
                flexShrink:1,
                width: '100%',
                height: height*0.14,
                margin: 5,
              }}>
              {
                this.props.P != 'P10' ? 
                <PuzzleIcon url={this.props.P_result == 'N' ? this.props.P : this.props.P_result}></PuzzleIcon> :
                <PuzzleIcon url={this.props.P_result == 'N' ? 'P10': 'P10W'}></PuzzleIcon>
              }
            </TouchableOpacity>
        )
    }
}

// const styles = StyleSheet.create({
//   row1Item: {
//     flexShrink:1,
//     width: '100%',
//     height: 50,
//     margin: 0.5,
//   },
//   bg: {
//     backgroundColor: BgColor,
//   }
// });
