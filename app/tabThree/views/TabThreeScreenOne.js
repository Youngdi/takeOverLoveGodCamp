'use strict'
import React from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Platform,
  TextInput,
  Button,
  AsyncStorage,
  Dimensions,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modalbox';
import Day3bg from '../../components/day3bg';
import Modaliconimage from '../../components/Modaliconimage';
import bibleFlag from '../../constants/bible';
import BackgroundImage from '../../components/BackgroundImage';
import HomeImage from '../../components/HomeImage';
import GiveScoreDay3 from '../../components/GiveScoreDay3';
import { getMyUser, getMyCountry, getLand, api_buyResource, api_buyLand, api_qrcode, api_giveScoreDay3} from '../../api/api';
import QRCode from '../../constants/qrcode';
const { width, height } = Dimensions.get("window");
const lockIcon = require("../../images/login1_lock.png");
const K_Jewelry = require("../../images/modal/K_Jewelry.png");
const Water = require("../../images/modal/Water.png");
const Fire = require('../../images/modal/fire.png');
const Wood = require('../../images/modal/Wood.png');
const Seed = require('../../images/modal/Seed.png');
const Stone = require('../../images/modal/Rock.png');
export default class TabThreeScreenOne extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const titleName = '尋寶獵人';
    return {
      title: titleName,
      headerTitleStyle:{
        alignSelf: 'center',
        marginRight: -20,
      },
      headerLeft: null,
    };
  };
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      isRefreshing: false,
      country: '',
      K: 0,
      water: 0,
      fire: 0,
      wood: 0,
      stone: 0,
      seed: 0,
      isOpen: false,
      visible: false,
      q_water:0,
      q_fire:0,
      q_wood:0,
      q_stone:0,
      q_seed:0,
      q_source:'',
      B1: 0,
      B2: 0,
      B3: 0,
      B4: 0,
      B5: 0,
      B6: 0,
      score_modal_isOpen:false,
      valuePWD:'',
      valueK:0,
      valueFire:0,
      valueWater:0,
      valueStone:0,
      valueSeed:0,
      valueWood:0,
    };
  }
  async init() {
    const country = await getMyCountry();
    this.setState({
      username: country.username,
      K: country.K,
      water: country.water,
      fire: country.fire,
      wood: country.wood,
      stone: country.stone,
      seed: country.seed,
      B1: country.B1,
      B2: country.B2,
      B3: country.B3,
      B4: country.B4,
      B5: country.B5,
      B6: country.B6,
      isRefreshing: false,
      visible: false,
      score_modal_isOpen:false,
      valuePWD:'',
      valueK:0,
      valueFire:0,
      valueWater:0,
      valueStone:0,
      valueSeed:0,
      valueWood:0,
    });
  }
  componentWillMount() {
    if (this.props.navigation.state.params) {
      function RemoveHTML(strText) {
        return strText.replace('://', "").replace('.', "").replace('.', "").replace('/', "");
      }
      const QRcode_money = QRCode[RemoveHTML(this.props.navigation.state.params.data)];
      if (QRcode_money == undefined) {
        const QRcode_url = this.props.navigation.state.params.data;
        (QRcode_url.search('line') > -1) ? alert('你想加line好友呀?') : alert('不要亂掃，我看不懂這是什麼鬼！');
      } else {
        const flag = api_qrcode(QRcode_money.fire, QRcode_money.water, QRcode_money.wood, QRcode_money.stone, QRcode_money.seed, QRcode_money.source)
        flag.then((data) => {
          if (data.data) {
            this.setState({
              visible: false,
              q_source: QRcode_money.source,
              q_water: QRcode_money.water,
              q_fire: QRcode_money.fire,
              q_stone: QRcode_money.stone,
              q_wood: QRcode_money.wood,
              q_seed: QRcode_money.seed,
            });
            Alert.alert(
            '掃描成功',
            `獲得資源能力加成\n火寶石:${this.state.q_fire}x${data.B.B2}, 水寶石:${this.state.q_water}x${data.B.B3}, 土寶石:${this.state.q_stone}x${data.B.B4}\n木寶石:${this.state.q_wood}x${data.B.B5}, 種子:${this.state.q_seed}x${data.B.B6}`,
            [
              {text: '確定', onPress: () => console.log('yes')},
            ],
              { cancelable: false }
            )
          } else {
            alert('此資源已領取過');
            this.setState({
              visible: false,
              q_source: QRcode_money.source,
              q_water: QRcode_money.water,
              q_fire: QRcode_money.fire,
              q_stone: QRcode_money.stone,
              q_wood: QRcode_money.wood,
              q_seed: QRcode_money.seed,
            });
          }
        })
      }

    }
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({isRefreshing: false});
    },500);
  }
  onPressSourceButton() {
    this.refs.score_modal.open();
  }
  async giveScore() {
    this.setState({
      visible: true,
      score_modal_isOpen:true,
    });
    const flag = await api_giveScoreDay3(this.state.valueK, this.state.valueFire, this.state.valueWater, this.state.valueWood, this.state.valueStone, this.state.valueSeed, this.state.valuePWD);
    if (flag.data) {
      Alert.alert(
      '給分成功',
      `獲得資源能力加成\nK寶石:${this.state.valueK}x${flag.B.B1}, 火寶石:${this.state.valueFire}x${flag.B.B2}, 水寶石:${this.state.valueWater}x${flag.B.B3}\n土寶石:${this.state.valueStone}x${flag.B.B4}, 木寶石:${this.state.valueWood}x${flag.B.B5}, 種子:${this.state.valueSeed}x${flag.B.B6}`,
      [
        {text: '確定', onPress: () => this.init()},
        {text: '前往首頁查看資源', onPress: () => {
          this.setState({
            visible: false,
            score_modal_isOpen:false,
          });
          this.props.navigation.navigate('Home');
        }},
      ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        '密碼錯誤別亂試～',
        '再亂試也沒有用拉～',
        [
          {text: '確定', onPress: () => this.setState({visible: false, score_modal_isOpen:true})}
        ],
          { cancelable: false }
      )
    }
    this.setState({isOpen: false});
  }
  bible() {
    let number = Math.floor(Math.random() * 74) + 1;
    let bible_number = `B${number}`;
    console.log(bible_number);
    Alert.alert(
    `每日一經文\n${bibleFlag[bible_number].chapter}`,
    `${bibleFlag[bible_number].verse}`,
    [
      {text: '確定', onPress: () => {}},
    ],
      { cancelable: false }
    )
  }
  render() {
    return (
      <View
        style={{
          flex:1,
          backgroundColor:'rgb(165,186,194)',
        }}>
        <ScrollView
          style={styles.contentContainer}     
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              title="Loading..."
            />
          }
        >
          <View style={{flex:1, justifyContent:'center', alignItems:'center', width:width, height:height*0.8}}>
              <Day3bg url={'bg'}>
                <View style={{flex:1, width:width, height:height * 0.93, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(255,255,255,0)'}}>
                  <View style={{flex:1, width:width*0.8, height:height, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(255,255,255,0)'}}>
                    <View style={{width:'100%',height:height * 0.07, marginBottom:20}}>
                      <Image
                        style={{width:'100%',height:height * 0.07}}
                        source={require('../../images/day3/top.png')}
                      ></Image>
                    </View>
                    <View style={styles.row1}>
                      <View style={{flexDirection:'row',flexWrap:'nowrap',flex:1, width:'100%'}}>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M1.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.bible.bind(this)()}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M2.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.props.navigation.navigate('TabThreeScreenTwo',{focused: true})}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M3.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.props.navigation.navigate('TabThreeScreenTwo',{focused: true})}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M4.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.props.navigation.navigate('TabThreeScreenTwo',{focused: true})}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M5.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.props.navigation.navigate('TabThreeScreenTwo',{focused: true})}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                      </View>
                    </View>
                    <View style={styles.row1}>
                      <View style={{flexDirection:'row',flexWrap:'nowrap',flex:1, width:'100%'}}>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M6.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.refs.score_modal.open()}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M7.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => {}}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M8.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => {}}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M9.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.refs.score_modal.open()}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M10.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.refs.score_modal.open()}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                      </View>
                    </View>
                    <View style={styles.row1}>
                      <View style={{flexDirection:'row',flexWrap:'nowrap',flex:1, width:'100%'}}>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M11.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => {}}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M12.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.refs.score_modal.open()}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M13.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.refs.score_modal.open()}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M14.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.props.navigation.navigate('TabThreeScreenTwo',{focused: true})}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M15.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.props.navigation.navigate('TabThreeScreenTwo',{focused: true})}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                      </View>
                    </View>
                    <View style={styles.row1}>
                      <View style={{flexDirection:'row',flexWrap:'nowrap',flex:1, width:'100%'}}>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M16.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.props.navigation.navigate('TabThreeScreenTwo',{focused: true})}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M17.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.refs.score_modal.open()}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M18.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.refs.score_modal.open()}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M19.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.props.navigation.navigate('TabThreeScreenTwo',{focused: true})}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M20.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.refs.score_modal.open()}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                      </View>
                    </View>
                    <View style={styles.row1}>
                      <View style={{flexDirection:'row',flexWrap:'nowrap',flex:1, width:'100%'}}>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M21.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.props.navigation.navigate('TabThreeScreenTwo',{focused: true})}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M22.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => {}}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M23.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.props.navigation.navigate('TabThreeScreenTwo',{focused: true})}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M24.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => {}}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                          <Image
                            style={{flexShrink:1, height:height * 0.09, margin:0.5}}
                            source={require('../../images/day3/M25.png')}>
                            <TouchableHighlight
                              underlayColor={'rgba(252,252,252,0.5)'} 
                              onPress={() => this.props.navigation.navigate('TabThreeScreenThree')}>
                              <View style={{width:'100%',height:height * 0.09, margin:0.5}}></View>
                            </TouchableHighlight>
                          </Image>
                      </View>
                    </View>
                    <View style={{width:'100%',height:height*0.1, marginTop:20}}>
                      <Image
                        style={{width:'100%',height:height*0.1}}
                        source={require('../../images/day3/bottom.png')}
                      ></Image>
                    </View>
                  </View>
                </View>
              </Day3bg>
          </View>
        </ScrollView>
        <Modal
          style={[styles.modal]}
          position={"center"}
          ref={"score_modal"}
          isOpen={this.state.score_modal_isOpen}
          swipeToClose={false}
        >
          <View style={styles.ImageShadow}>
            <Image
            style={styles.backdrop}
            resizeMode={'stretch'}
            source={require('../../images/long_modal_bg.png')}>
              <TouchableOpacity onPress={() => this.setState({score_modal_isOpen:false})} 
                style={{right:-250,top:10, width:100, height:50}}>
                <View></View>
              </TouchableOpacity>
              <Text style={{color:'rgb(60,60,60)',backgroundColor:'rgba(255,255,255,0)',textAlign:'center',fontSize: 20,fontWeight: '800', top:-20}}>{'挑戰關主'}</Text>
              <ScrollView style={{width:'100%',height:'100%'}}>
                <View style={styles.backdropSourceView}>
                  <View style={{flex:1, width:'80%', marginTop:0}}>
                    <View style={styles.container}>  
                      <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                          <Image source={K_Jewelry} style={styles.icon} resizeMode="contain" />
                        </View>
                        <TextInput
                          placeholder="K寶石"
                          placeholderTextColor="#8495a0"
                          style={styles.input}
                          keyboardType={'numeric'}
                          defaultValue={'0'}
                          onChangeText={(K) => this.setState({valueK:K,score_modal_isOpen:true})}
                        />
                      </View>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                          <Image source={Fire} style={styles.icon} resizeMode="contain" />
                        </View>
                        <TextInput
                          placeholder="火寶石"
                          placeholderTextColor="#8495a0"
                          style={styles.input}
                          keyboardType={'numeric'}
                          defaultValue={'0'}
                          onChangeText={(fire) => this.setState({valueFire:fire,score_modal_isOpen:true})}
                        />
                      </View>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                          <Image source={Water} style={styles.icon} resizeMode="contain" />
                        </View>
                        <TextInput
                          placeholder="水寶石"
                          placeholderTextColor="#8495a0"
                          style={styles.input}
                          keyboardType={'numeric'}
                          defaultValue={'0'}
                          onChangeText={(water) => this.setState({valueWater:water,score_modal_isOpen:true})}
                        />
                      </View>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                          <Image source={Wood} style={styles.icon} resizeMode="contain" />
                        </View>
                        <TextInput
                          placeholder="木寶石"
                          placeholderTextColor="#8495a0"
                          style={styles.input}
                          keyboardType={'numeric'}
                          defaultValue={'0'}
                          onChangeText={(wood) => this.setState({valueWood:wood,score_modal_isOpen:true})}
                        />
                      </View>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                          <Image source={Stone} style={styles.icon} resizeMode="contain" />
                        </View>
                        <TextInput
                          placeholder="地寶石"
                          placeholderTextColor="#8495a0"
                          style={styles.input}
                          keyboardType={'numeric'}
                          defaultValue={'0'}
                          onChangeText={(stone) => this.setState({valueStone:stone,score_modal_isOpen:true})}
                        />
                      </View>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                          <Image source={Seed} style={styles.icon} resizeMode="contain" />
                        </View>
                        <TextInput
                          placeholder="種子"
                          placeholderTextColor="#8495a0"
                          style={styles.input}
                          keyboardType={'numeric'}
                          defaultValue={'0'}
                          onChangeText={(seed) => this.setState({valueSeed:seed,score_modal_isOpen:true})}
                        />
                      </View>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                          <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                        </View>
                        <TextInput
                          placeholder="關主密碼"
                          placeholderTextColor="#8495a0"
                          style={styles.input}
                          secureTextEntry
                          onChangeText={(password) => this.setState({valuePWD:password,score_modal_isOpen:true})}
                        />
                      </View>
                      <Button
                        onPress={this.giveScore.bind(this)}
                        title={'確定給分'}
                      >
                      </Button>
                    </View>
                  </View>
                </View>
                <View style={{width:1,height:300}}></View>
              </ScrollView>
            </Image>
          </View>
        </Modal>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
      //textAlign: 'center',
      color: 'black',
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 32
  },
  row1: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'nowrap',
  },
  box: {
    height: '80%',
    width: '100%',
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
    marginTop: Platform.OS == 'ios' ? 25 : 0,
    height: height,
    width: width,
  },
  source: {
    flex: 1,
    width: null,
    height: null,
    alignItems:'center',
    justifyContent:'center',
  },
  backdropView: {
    flex:1,
    width: width*0.155,
    height: width*0.155,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    marginTop:0,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: 'rgb(255,255,255)'
  },
  sourceSize: {
    width:'100%',
    height: width*0.155,
    flexShrink:1
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    height:400,
    marginTop: Platform.OS == 'ios' ? 25 : 0,
  },
  backdrop: {
    left:-16,
    top:-15,
    width: 330,
    height: 450,
  },
  backdropSourceView:{
    flex:1,
    width:330,
    height:450,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  backdropSourceViewHeadline:{
    marginTop:-50,
    marginBottom:20,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    color: 'rgb(60,60,60)'
  },
  backdropSourceViewClose:{
    left: Platform.OS == 'ios' ? 150 : 135,
    top:15,
    fontSize: 20,
    fontWeight: '800',
    color: 'rgb(255,255,255)'
  },
  ImageShadow: {
    width:'100%',
    height:'100%',
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
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
