import React from 'react';
import { Dimensions } from 'react-native';
import PhotoView from 'react-native-photo-view';
const { width, height } = Dimensions.get("window");
export default class History extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'國家歷史',
    }
  };
  render(){
    return(
      <PhotoView
        source={require('../images/TakeOver_History.png')}
        minimumZoomScale={0.5}
        maximumZoomScale={3}
        androidScaleType="center"
        style={{width: width, height: height}}
      />
    )
  }
}
