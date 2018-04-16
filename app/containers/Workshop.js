'use strict'
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackgroundImage from '../../components/BackgroundImage';
import { Platform, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Card, ListItem, Button } from 'react-native-elements'
const { width, height } = Dimensions.get("window");
export default class TabOneScreenTwo extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'工作坊',
      headerTitleStyle:{
        alignSelf: 'center',
        marginLeft: -20,
      },
      headerLeft: (
        <Ionicons.Button name="ios-menu" color="#185ffe" style={{marginLeft:13}}backgroundColor="#eeeef2" onPress={() => navigation.navigate('DrawerOpen')}>
        </Ionicons.Button>
      ),
      drawerLabel: '工作坊',
      drawerIcon: ({ tintColor }) => (
        <Ionicons
          name={'md-construct'}
          size={Platform == 'ios' ? 26 : 20}
          style={{ color: tintColor }}
        />
      ),
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
          <ScrollView style={styles.container}>
            <View style={{marginTop:Platform.OS == 'ios' ? 30 : 0, flex: 1, justifyContent:'flex-start', alignItems:'center'}}>
              <Text style={styles.text}>賢者的分享時間</Text>
                <View style={styles.ImageShadow}>
                  <Image 
                    style={styles.backdrop} 
                    source={require('../../images/workshop/A鄭俊德.jpg')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>鄭俊德-閱讀社群創辦人</Text>
                      </View>
                  </Image>
                </View>
                <View style={{marginTop:20, width:300}}>
                  <Text style={styles.speakerIntro}>18歲罹患的一場大病，讓鄭俊德對於生命所追求的價值起了變化，醫學工程畢業的他，放棄穩定的醫療業務工作，在臉書創辦了閱讀社群；一開始只是單純分享自己閱讀到的好故事，沒想到還感動讀者，紛紛投稿分享，開始寫出自己的故事。至今，閱讀社群目前有近百萬粉絲、千位創作者，累積文章達數萬篇，包括詩、時事評論、還有更多故事。他們辦讀書會，設計桌遊、運動、喝下午茶等方式，交換讀書心得；也做公益，淨灘、幫助偏鄉弱勢。他深信，每個人在閱讀中都能找到屬於自己生命的答案。</Text>
                  <View style={{width:'100%', height:50}}></View>
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.container}>
            <View style={{marginTop:Platform.OS == 'ios' ? 30 : 0, flex: 1, justifyContent:'flex-start', alignItems:'center'}}>
              <Text style={styles.text}>海上求生技能坊-砲擊訓練</Text>
                <View style={styles.ImageShadow}>
                  <Image 
                    style={styles.backdrop} 
                    source={require('../../images/workshop/B砲擊訓練 Basketball-楊德恩.jpg')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>楊德恩-台灣品格籃球創辦人</Text>
                      </View>
                  </Image>
                </View>
                <View style={{marginTop:20, width:300}}>
                  <Text style={styles.speakerIntro}>20歲時，原本夢想打NBA的他，在沒人力、沒經費、沒經驗的情況下，創立了台灣品格籃球；兩年後的現在，他已連結超過五十間學校，接觸超過五千名孩子，遍及台灣、香港、馬來西亞。一起在下午的工作坊中，感受品格籃球的魅力吧！</Text>
                  <View style={{width:'100%', height:50}}></View>
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.container}>
            <View style={{marginTop:Platform.OS == 'ios' ? 30 : 0, flex: 1, justifyContent:'flex-start', alignItems:'center'}}>
              <Text style={styles.text}>海上求生技能坊-航海圖繪製</Text>
                <View style={styles.ImageShadow}>
                  <Image 
                    style={styles.backdrop} 
                    source={require('../../images/workshop/B航海圖繪製Illustration-沈凡鈞.jpg')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>沈凡鈞-台師大設計碩士專班</Text>
                      </View>
                  </Image>
                </View>
                <View style={{marginTop:20, width:300}}>
                  <Text style={styles.speakerIntro}>曾任HIRES與相關品牌袋包設計師，羅爾德企業設計師。專長為袋包設計、產品設計、詭異畫風的插畫，目標是可以當一個有自己工作室不要當一輩子打工的設計師。曾獲得全國節能車競賽第五名、IDA設計競賽銅獎、德國DMY設計展參展、兩屆ADA設計工作營參與。</Text>
                  <View style={{width:'100%', height:50}}></View>
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.container}>
            <View style={{marginTop:Platform.OS == 'ios' ? 30 : 0, flex: 1, justifyContent:'flex-start', alignItems:'center'}}>
              <Text style={styles.text}>海上求生技能坊-船艇修繕</Text>
                <View style={styles.ImageShadow}>
                  <Image 
                    style={styles.backdrop} 
                    source={require('../../images/workshop/B船艇修繕Handicraft-林欣宜.jpg')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>林欣宜-旌旗教會設計師</Text>
                      </View>
                  </Image>
                </View>
                <View style={{marginTop:20, width:300}}>
                  <Text style={styles.speakerIntro}>畢業於朝陽科技大學景觀及都市設計系。現為旌旗教會設計師。喜歡赤腳土地溫度情感，因為那是最直接感受這塊土地溫度的回憶，而這些細節溫度是卻能讓人感到飽足的設計靈感。如同作家汪世旭所說的：「不要因為鞋子那一分小小的厚度，阻礙了你跟土地的親近。」</Text>
                  <View style={{width:'100%', height:50}}></View>
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.container}>
            <View style={{marginTop:Platform.OS == 'ios' ? 30 : 0, flex: 1, justifyContent:'flex-start', alignItems:'center'}}>
              <Text style={styles.text}>海上求生技能坊-間諜訓練A</Text>
                <View style={styles.ImageShadow}>
                  <Image 
                    style={styles.backdrop} 
                    source={require('../../images/workshop/B間諜訓練Drama-1-陳靜萱.jpg')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>陳靜萱-國立台北藝術大學戲劇系</Text>
                      </View>
                  </Image>
                </View>
                <View style={{marginTop:20, width:300}}>
                  <Text style={styles.speakerIntro}>目前就讀國立台北藝術大學戲劇系。生活中有很多不同的小細節，它們都帶給我影響。甚至生活上毫無相關的小事，它們都會，深深的影響我看待表演的方式。」</Text>
                  <View style={{width:'100%', height:50}}></View>
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.container}>
            <View style={{marginTop:Platform.OS == 'ios' ? 30 : 0, flex: 1, justifyContent:'flex-start', alignItems:'center'}}>
              <Text style={styles.text}>海上求生技能坊-間諜訓練B</Text>
                <View style={styles.ImageShadow}>
                  <Image 
                    style={styles.backdrop} 
                    source={require('../../images/workshop/B間諜訓練Drama-2-陳又安.jpg')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>陳又安-世新大學廣電系電影組</Text>
                      </View>
                  </Image>
                </View>
                <View style={{marginTop:20, width:300}}>
                  <Text style={styles.speakerIntro}>目前就讀世新大學廣電系電影組大二，喜歡文學、電影、表演、寫詩，是個熱衷的學習者；借用簡媜【水問】的話送給大家：「期待我的生命，直到生命的盡頭，我願意是個傷痕累累的人，殉於對人事的熱愛之中」</Text>
                  <View style={{width:'100%', height:50}}></View>
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.container}>
            <View style={{marginTop:Platform.OS == 'ios' ? 30 : 0, flex: 1, justifyContent:'flex-start', alignItems:'center'}}>
              <Text style={styles.text}>海上求生技能坊-海獸催眠師訓練</Text>
                <View style={styles.ImageShadow}>
                  <Image 
                    style={styles.backdrop} 
                    source={require('../../images/workshop/B海獸催眠師訓練Guitar-江明達.jpg')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>江明達-吉他老師</Text>
                      </View>
                  </Image>
                </View>
                <View style={{marginTop:20, width:300}}>
                  <Text style={styles.speakerIntro}>目前在初戀敬拜任教、南港高中吉他社指導老師，教課至今有七八年的經驗，對音樂有無比的熱情，期待任何喜歡吉他喜歡音樂的你，都能持續學習，不放棄～</Text>
                  <View style={{width:'100%', height:50}}></View>
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.container}>
            <View style={{marginTop:Platform.OS == 'ios' ? 30 : 0, flex: 1, justifyContent:'flex-start', alignItems:'center'}}>
              <Text style={styles.text}>海上求生技能坊-海上音樂家訓練</Text>
                <View style={styles.ImageShadow}>
                  <Image 
                    style={styles.backdrop} 
                    source={require('../../images/workshop/B海上音樂家訓練Compose-鄭耀.jpg')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>鄭耀-音樂創作者</Text>
                      </View>
                  </Image>
                </View>
                <View style={{marginTop:20, width:300}}>
                  <Text style={styles.speakerIntro}>就讀台師大流行音樂產業碩士專班，現為詞曲創作人、編曲人、吉他老師、流行鍵盤與和聲老師，夢想成為藉著作品傳達愛和真理的創作歌手；作品曾入選新歌文創2017年 music x change top 10, 曾於天空之城音樂工作室實習</Text>
                  <View style={{width:'100%', height:50}}></View>
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.container}>
            <View style={{marginTop:Platform.OS == 'ios' ? 30 : 0, flex: 1, justifyContent:'flex-start', alignItems:'center'}}>
              <Text style={styles.text}>海上求生技能坊-水手默契訓練</Text>
                <View style={styles.ImageShadow}>
                  <Image 
                    style={styles.backdrop} 
                    source={require('../../images/workshop/長平.jpg')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>萬長平-台北旌旗青年區牧</Text>
                      </View>
                  </Image>
                </View>
                <View style={{marginTop:20, width:300}}>
                  <Text style={styles.speakerIntro}>原美光研發工程師，現任旌旗台北青年中心區牧；在青年團隊擔任小組長至今超過15年的他，將豐富的團隊建造經驗融入體驗活動中，在互動中看見團隊、看見他人、看見自己。</Text>
                  <View style={{width:'100%', height:50}}></View>
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.container}>
            <View style={{marginTop:Platform.OS == 'ios' ? 30 : 0, flex: 1, justifyContent:'flex-start', alignItems:'center'}}>
              <Text style={styles.text}>海上求生技能坊-艦隊經營學</Text>
                <View style={styles.ImageShadow}>
                  <Image 
                    style={styles.backdrop} 
                    source={require('../../images/workshop/B艦隊經營學Career Analysis-莊懷德.jpg')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>莊懷德-匯豐銀行資深副總裁</Text>
                      </View>
                  </Image>
                </View>
                <View style={{marginTop:20, width:300}}>
                  <Text style={styles.speakerIntro}>於匯豐銀行任職資深副總裁的他，不只自身在職場上有好的成就，也不斷幫助他的下屬在職場中找到自己的定位與熱情。讓我再次期待，懷德哥以他豐富的職場以及主管經驗來跟我們分享，如何預備自己找到屬於自己的理想工作、擁抱夢想中的人生。</Text>
                  <View style={{width:'100%', height:50}}></View>
                </View>
            </View>
          </ScrollView>
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
    backgroundColor: '#2c2f30',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c2f30',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c2f30',
  },
  text: {
    color: '#fff',
    fontSize: 20,
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
    color:'white',
    fontSize:16,
    fontWeight:'300',
    letterSpacing:0.5,
    lineHeight: Platform.OS === 'ios' ? 22 : 25
  }
})