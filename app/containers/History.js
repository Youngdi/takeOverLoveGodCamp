import React from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
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
      // <PhotoView
      //   source={require('../images/TakeOver_History.png')}
      //   minimumZoomScale={0.5}
      //   maximumZoomScale={3}
      //   androidScaleType="centerCrop"
      //   style={{width: width, height: height +200}}
      // />
      <ScrollView>
        <View style={{flex:1, justifyContent:'center', alignItems:'center', width:width, height:height * 2}}>
          <Image
            style={{width: width, height: '100%'}}
            source={require('../images/TakeOver_History.png')}
            resizeMode={'cover'}
          />
        </View>
      </ScrollView>
    )
  }
}
