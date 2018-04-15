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
} from 'react-native';
import Modal from 'react-native-modalbox';
import * as Config from '../../constants/config';
import imageFlags from '../../constants/config';
import history from '../../constants/history';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getMyUser, getMyCountry, api_buyResource, getFlagFromSetting } from '../../api/api';
import Modaliconimage from '../../components/Modaliconimage';
import HomeImage from '../../components/HomeImage.js';
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get("window");


export default class TabOneScreenOne extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      isRefreshing: false,
      board: '',
      country:'M',
      K: 0,
      water: 0,
      fire: 0,
      wood: 0,
      stone: 0,
      seed: 0,
      shopIcon: 'water',
      shopText: '水寶石',
      shopMoney: 0,
      isOpen: false,
      visible: true,
      history_isOpen: false,
    };
  }
  async init() {
    try {
      const table_flag = await getFlagFromSetting();
      if (table_flag.changeToDay3 == 'T') {
        const country = await getMyCountry();
        if (country) {
          this.setState({
            username: country.username,
            country: country.country,
            K: country.K,
            water: country.water,
            fire: country.fire,
            wood: country.wood,
            stone: country.stone,
            seed: country.seed,
            isRefreshing: false,
            visible: false,
            isOpen: false,
          });
        } else {
          this.setState({
            visible: false,
          });
          this.props.navigation.navigate('Login');
        }

      } else {
        const user = await getMyUser();
        if (user) { 
          this.setState({
            username: user.username,
            country: user.country,
            K: user.K,
            water: user.water,
            fire: user.fire,
            wood: user.wood,
            stone: user.stone,
            seed: user.seed,
            isRefreshing: false,
            visible: false,
            isOpen: false,
          });
        } else {
          this.setState({
            visible: false,
          });
          this.props.navigation.navigate('Login');
        }
      }
    } catch (error) {
      alert('不好意思，伺服器已關閉，明年請儘早報名變強好不好夏令營');
    }
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    this.init();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      visible: false,
      title:'首頁',
      headerTitleStyle:{
        alignSelf: 'center',
        marginLeft: -20,
      },
      headerLeft: (
        <Ionicons.Button 
          name="ios-menu"
          color="#185ffe"
          style={{marginLeft:13}} 
          backgroundColor="#eeeef2"
          onPress={
            () => navigation.navigate('DrawerOpen')
          }>
        </Ionicons.Button>
      ),
      drawerLabel: '首頁',
      drawerIcon: ({ tintColor }) => (
        <Ionicons
          name={'md-home'}
          size={Platform == 'ios' ? 26 : 20}
          style={{ color: tintColor }}
        />
      ),
    }
  };
  onPressSourceButton(resource) {
    let shopText = "";
    switch (resource) {
      case 'fire':
        shopText = "火寶石";
        break;
      case 'water':
        shopText = "水寶石";
        break;
      case 'seed':
        shopText = "種子";
        break;
      case 'wood':
        shopText = "木寶石";
        break;
      case 'stone':
        shopText = "土寶石";
        break;
    }
    this.setState({
      shopIcon: resource,
      shopText: shopText,
    });
    this.refs.buy_modal.open();
  }
  onChangeText(val){
    this.setState({
      shopMoney: val,
      isOpen:true,
    })
  }
  async buy() {
    this.setState({
      visible: true,
    });
    const flag = await api_buyResource(this.state.shopMoney, this.state.shopIcon, this.state.K);
    if (flag.data) {
      Alert.alert(
        '購買成功',
        '歡迎下次再度光臨',
        [
          {text: '確定', onPress: () => {
            this.init();
          }},
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        '購買失敗',
        'K寶不足或請輸入可以被3整除的數',
        [
          {text: 'OK', onPress: () => {
            this.setState({
              visible: false,
            })
          }},
        ],
        { cancelable: false }
      )
    }
  }
  render() {
    return(
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
              //tintColor="#ff0000"
              title="Loading..."
              //titleColor="#00ff00"
              //colors={['#ff0000', '#00ff00', '#0000ff']}
              //progressBackgroundColor="#ffff00"
            />
          }
        >
            <View style={{width:'100%', height:height*0.5, marginBottom:15}} >
              <TouchableOpacity onPress={() => this.refs.history_modal.open()}>
               <HomeImage url={this.state.username} navigation={this.props.navigation}></HomeImage>
              </TouchableOpacity>
            </View>
            <View style={{width:'100%'}}>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/fire.png')}>
                    <TouchableOpacity onPress={this.onPressSourceButton.bind(this, 'fire')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{Math.floor(this.state.fire)}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/k.png')}>
                    <TouchableOpacity onPress={() => alert('神祕的K寶石可以用來買各種資源')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{Math.floor(this.state.K)}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/water.png')}>
                    <TouchableOpacity onPress={this.onPressSourceButton.bind(this, 'water')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{Math.floor(this.state.water)}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
              </View>
              <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/stone.png')}>
                    <TouchableOpacity onPress={this.onPressSourceButton.bind(this, 'stone')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{Math.floor(this.state.stone)}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/seed.png')}>
                    <TouchableOpacity onPress={this.onPressSourceButton.bind(this, 'seed')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{Math.floor(this.state.seed)}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
                <View style={styles.sourceSize}>
                  <Image
                    style={styles.source}
                    source={require('../../images/home/wood.png')}>
                    <TouchableOpacity onPress={this.onPressSourceButton.bind(this, 'wood')}>
                      <View style={styles.backdropView}>
                        <Text style={styles.headline}>{Math.floor(this.state.wood)}</Text>
                      </View>
                    </TouchableOpacity>
                  </Image>
                </View>
              </View>
              <View style={{width:'100%', height:5}}></View>
            </View>
        </ScrollView>
        <Modal
          style={[styles.modal]}
          position={"center"}
          ref={"buy_modal"}
          isOpen={this.state.isOpen}
          swipeToClose={false}
        >
          <View style={styles.ImageShadow}>
            <Image 
              style={styles.backdrop} 
              source={require('../../images/short_modal_bg.png')}>
                <ScrollView contentContainerStyle={styles.backdropSourceView}>
                  <Text onPress={() => this.setState({isOpen:false})} style={styles.backdropSourceViewClose}>{''}</Text>
                  <Text style={styles.backdropSourceViewHeadline}>請問你是否要用3顆K寶石換1個{this.state.shopText}</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:20,marginTop:18}}>3</Text>
                    <Text style={{fontSize:20,marginTop:18, marginLeft:10}}>X</Text>
                    <Image
                      style={{width:50, height:50}}
                      source={require('../../images/modal/K_Jewelry.png')}
                    ></Image>
                    <Text style={{fontSize:20,marginTop:18, marginRight:10}}>=</Text>
                    <Modaliconimage url={this.state.shopIcon}>
                    </Modaliconimage>
                  </View>
                  <View style={{width:250, marginTop:20}}>
                      <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                          <Image source={require('../../images/modal/K_Jewelry.png')} style={styles.icon} resizeMode="contain" />
                        </View>
                        <TextInput
                          placeholder="請輸入數量"
                          keyboardType="numeric"
                          placeholderTextColor="#8495a0" 
                          style={styles.input}
                          onChangeText={(val) => this.onChangeText(val)}
                          />
                    </View>
                  </View>
                  <View style={{top:5, width:200}}>
                    <Button
                      style={{width:100}}
                      title={"確定購買"}
                      onPress={this.buy.bind(this)}
                    >
                    </Button>
                  </View>
                </ScrollView>
            </Image>
          </View>
        </Modal>
        <Modal
          position={"center"}
          ref={"history_modal"}
          isOpen={this.state.history_isOpen}
          swipeToClose={false}
        >
          <View style={styles.ImageShadow}>
            <Image 
              style={{width:width +20,height:height +30, top: -30, left:-10}}
              source={require('../../images/long_modal_bg.png')}>
              <TouchableOpacity onPress={() => this.setState({history_isOpen:false})} style={{position:'absolute',right:0,top:30, width:100, height:100}}>
              <View></View>
              </TouchableOpacity>
                <ScrollView 
                  style={{
                    flex:1,
                    width:width,
                    height:height,
                    backgroundColor: 'rgba(0,0,0,0)',
                    marginTop:80,
                  }}
                  contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View>
                    <Text style={{fontSize:30, fontWeight:'800', color:'rgb(120,120,120)', marginBottom:30}}>{'國家歷史'}</Text>
                  </View>
                  <View style={{width:width * 0.8}}>
                    <Text style={{fontSize:20, fontWeight:'400', color:'rgb(60,60,60)', marginBottom:30}}>{history[this.state.country].history}</Text>
                  </View>
                  <View>
                    <Text style={{fontSize:30, fontWeight:'800', color:'rgb(120,120,120)', marginBottom:30}}>{'特殊能力'}</Text>
                  </View>
                  <View style={{width:width * 0.8}}>
                    <Text style={{fontSize:20, fontWeight:'400', color:'rgb(60,60,60)', marginBottom:30}}>{history[this.state.country].ability}</Text>
                  </View>
                  <View style={{width:1,height:50}}></View>
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
    textAlign: 'center',
    color: 'red',
    fontSize: 32
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
    width: width*0.3,
    height: width*0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    marginTop:70,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: 'rgb(255,255,255)'
  },
  sourceSize: {
    width:'100%',
    height: width*0.3,
    flexShrink:1
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width:300,
    height:300,
  },
  backdrop: {
    left:-16,
    top:-15,
    width: 330,
    height: 330,
  },
  backdropSourceView:{
    flex:1,
    width:330,
    height:330,
    justifyContent: 'center',
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
    left:130,
    bottom:50,
    fontSize: 20,
    width:50,
    height:50,
    fontWeight: '800',
    backgroundColor: 'rgba(255,255,255,0)'
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
