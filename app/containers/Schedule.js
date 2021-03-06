import React from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import PhotoView from 'react-native-photo-view';
const { width, height } = Dimensions.get("window");

export default class Schedule extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'行程表',
    }
  };
  render() {
    return(
      // <PhotoView
      //   source={require('../images/schdule2018.jpg')}
      //   minimumZoomScale={0.2}
      //   maximumZoomScale={3}
      //   androidScaleType={'center'}
      //   style={{width: width, height: height}}
      // />
      <ScrollView>
        <View style={{flex:1, justifyContent:'center', alignItems:'center', width:width, height:height, marginTop:10, marginBottom:10}}>
          <Image
            style={{width: width * 0.96}}
            source={require('../images/schdule2018.jpg')}
            resizeMode={'contain'}
          />
        </View>
      </ScrollView>
    )
  }
}
