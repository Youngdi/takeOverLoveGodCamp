import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform, Image, ImageBackground, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import workshop from '../constants/workshop';
const { width, height } = Dimensions.get("window");

export default class Workshop2018 extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'講員介紹',
    }
  };
  render() {
    return(
      <Swiper 
        style={styles.wrapper} 
        height={Platform.OS == 'ios' ? height - 30 : height - 56} 
        showsButtons={true}
        showsPagination={true} 
        bounces={Platform.OS == 'ios' ? true: false}
      >
      {workshop.map((value, index) =>
          <ScrollView style={styles.container} key={index}>
            <View style={{marginTop:Platform.OS == 'ios' ? 30 : 0, flex: 1, justifyContent:'flex-start', alignItems:'center'}}>
              <Text style={styles.text}>{value.category}</Text>
                <View style={styles.ImageShadow}>
                  <ImageBackground 
                    style={styles.backdrop} 
                    source={value.image}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{value.name}</Text>
                      </View>
                  </ImageBackground>
                </View>
                <View style={{marginTop:20, width:300}}>
                  <Text style={styles.speakerIntro}>{value.introduction}</Text>
                  <View style={{width:'100%', height:50}}></View>
                </View>
            </View>
          </ScrollView>
      )}
      </Swiper>
    )
  }
}
var styles = StyleSheet.create({
  wrapper: {
  },
  container: {
    flex: 1,
    height: height,
    backgroundColor: '#FDF6FA',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom:10,
    marginTop: Platform.OS == 'ios' ? 0 : 10,
  },
  backdrop: {
    width: 300,
    height: 300,
  },
  ImageShadow: {
    borderWidth: 3,
    borderColor:'rgba(252,252,252,0.5)',
    borderRadius: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 0
    }
  },
  backdropView: {
    flex:1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    backgroundColor: 'rgba(90,90,90,0.7)',
    color: 'white'
  },
  speakerIntro: {
    color:'black',
    fontSize:16,
    fontWeight:'400',
    letterSpacing:0.5,
    lineHeight: Platform.OS === 'ios' ? 22 : 25
  }
})