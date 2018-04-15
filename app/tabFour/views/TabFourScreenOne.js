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
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modalbox';
import LandBG from '../../components/land';
import Modaliconimage from '../../components/Modaliconimage';
import BackgroundImage from '../../components/BackgroundImage';
import HomeImage from '../../components/HomeImage.js';
import landFlag from '../../constants/land';
import { getMyUser, getMyCountry, getLand, api_buyResource, api_buyLand, getFlagFromSetting} from '../../api/api';

const { width, height } = Dimensions.get("window");

export default class TabFourScreenOne extends React.Component {
  static contextTypes = {
    socket: React.PropTypes.object,
  }
  static navigationOptions = {
    title: '領土爭奪戰',
    headerTitleStyle:{
      alignSelf: 'center',
    },
  }
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      isRefreshing: false,
      isOpen: false,
      visible1: false,
      lands: [],
      reference:9999,
    };
  }
  async init() {
    const country = await getMyCountry();
    const land = await getLand();
    const setting = await getFlagFromSetting();
    this.setState({
      isRefreshing: false,
      isOpen:false,
      visible1:false,
      my_K: country.K,
      my_water: country.water,
      my_fire: country.fire,
      my_wood: country.wood,
      my_stone: country.stone,
      my_seed: country.seed,
      K: 0,
      water: 0,
      fire: 0,
      wood: 0,
      stone: 0,
      seed: 0,
      B1:country.B1,
      B2:country.B2,
      B3:country.B3,
      B4:country.B4,
      B5:country.B5,
      B6:country.B6,
      lands: land,
      map_name: '',
      reference: setting.reference
    });
  }
  async buy() {
    Alert.alert(
      '購買再次確定',
      `此筆交易將花費\n火:${this.state.fire}, 水:${this.state.water}, 石:${this.state.stone}, 種子:${this.state.seed}, 木頭:${this.state.wood}`,
      [
        {text: '購買', onPress: async () => {
          this.setState({
            isOpen: true,
            visible1: true,
          });
          if (this.state.my_fire >= this.state.fire
           && this.state.my_water >= this.state.water
           && this.state.my_stone >= this.state.stone
           && this.state.my_seed >= this.state.seed
           && this.state.my_wood >= this.state.wood
          ) {
            await api_buyLand(this.state.fire, this.state.water, this.state.wood, this.state.stone, this.state.seed, this.state.map_name)
            Alert.alert(
              '購買成功',
              '歡迎下次再度光臨',
              [
                {text: '確定', onPress: () => {
                  this.context.socket.emit('message','refresh')
                  this.setState({
                    isOpen: false,
                    visible1: false,
                  });
                }},
              ],
              { cancelable: false }
            )
          } else {
            Alert.alert(
              '購買失敗',
              '資源不足',
              [
                {text: '前往首頁購買', onPress: () => {
                  this.setState({
                     visible1: false,
                  })
                 this.props.navigation.navigate('Home');
                }},
                {text: '取消', onPress: () => this.setState({visible1: false,}), style: 'cancel'},
              ],
              { cancelable: false }
            )
          }
        }},
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }
  componentWillMount() {
    this.context.socket.on('message', (message) => {
      this.init();
    });
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    this.init();
  }
  onPressSourceButton(fire, water, wood, stone, seed, map_name, country) {
    this.setState({
      water: water * this.state.reference,
      fire: fire * this.state.reference,
      wood: wood * this.state.reference,
      stone: stone * this.state.reference,
      seed: seed * this.state.reference,
      map_name: map_name,
    });
    if(country === 'N') {
      this.refs.buy_modal.open();
    } else {
      alert('此地已被購買');
    }
  }
  render() {
    const listItems1 = this.state.lands.reduce((acc, current, index) => {
       let view;
        if (index < 7) {
          // 0-6
          view = <View style={styles.sourceSize} key={index}>
              <Image
                style={styles.source}
                source={landFlag[`P${index+1}`]}>
                <TouchableHighlight 
                  underlayColor={'rgba(252,252,252,0.5)'} 
                  onPress={this.onPressSourceButton.bind(this, current.fire, current.water, current.wood, current.stone, current.seed, `M${index+1}`, current.country)}>
                  <View style={styles.backdropView}>
                    <Image
                      source={landFlag[current.country]}
                      style={{width:width * 0.113, height:width * 0.113}}
                    ></Image>
                  </View>
                </TouchableHighlight>
              </Image>
            </View>;
        }
        acc.push(view);
        return acc;
      },[]);
    const listItems2 = this.state.lands.reduce((acc, current, index) => {
       let view;
        if (index > 6 && index < 14) {
          // 7-13
          view = <View style={styles.sourceSize} key={index}>
              <Image
                style={styles.source}
                source={landFlag[`P${index+1}`]}>
                <TouchableHighlight 
                  underlayColor={'rgba(252,252,252,0.5)'} 
                  onPress={this.onPressSourceButton.bind(this, current.fire, current.water, current.wood, current.stone, current.seed, `M${index+1}`, current.country)}>
                  <View style={styles.backdropView}>
                    <Image
                      source={landFlag[current.country]}
                      style={{width:width * 0.113, height:width * 0.113}}
                    ></Image>
                  </View>
                </TouchableHighlight>
              </Image>
            </View>;
        }
        acc.push(view);
        return acc;
      },[]);
    const listItems3 = this.state.lands.reduce((acc, current, index) => {
       let view;
        if (index > 13 && index < 21) {
          // 14-20
          view = <View style={styles.sourceSize} key={index}>
              <Image
                style={styles.source}
                source={landFlag[`P${index+1}`]}>
                <TouchableHighlight 
                  underlayColor={'rgba(252,252,252,0.5)'} 
                  onPress={this.onPressSourceButton.bind(this, current.fire, current.water, current.wood, current.stone, current.seed, `M${index+1}`, current.country)}>
                  <View style={styles.backdropView}>
                    <Image
                      source={landFlag[current.country]}
                      style={{width:width * 0.113, height:width * 0.113}}
                    ></Image>
                  </View>
                </TouchableHighlight>
              </Image>
            </View>;
        }
        acc.push(view);
        return acc;
      },[]);
    const listItems4 = this.state.lands.reduce((acc, current, index) => {
       let view;
        if (index > 20 && index < 28) {
          // 21-27
          view = <View style={styles.sourceSize} key={index}>
              <Image
                style={styles.source}
                source={landFlag[`P${index+1}`]}>
                <TouchableHighlight 
                  underlayColor={'rgba(252,252,252,0.5)'} 
                  onPress={this.onPressSourceButton.bind(this, current.fire, current.water, current.wood, current.stone, current.seed, `M${index+1}`, current.country)}>
                  <View style={styles.backdropView}>
                    <Image
                      source={landFlag[current.country]}
                      style={{width:width * 0.113, height:width * 0.113}}
                    ></Image>
                  </View>
                </TouchableHighlight>
              </Image>
            </View>;
        }
        acc.push(view);
        return acc;
      },[]);
    const listItems5 = this.state.lands.reduce((acc, current, index) => {
       let view;
        if (index > 27 && index < 35) {
          // 28-34
          view = <View style={styles.sourceSize} key={index}>
              <Image
                style={styles.source}
                source={landFlag[`P${index+1}`]}>
                <TouchableHighlight 
                  underlayColor={'rgba(252,252,252,0.5)'} 
                  onPress={this.onPressSourceButton.bind(this, current.fire, current.water, current.wood, current.stone, current.seed, `M${index+1}`, current.country)}>
                  <View style={styles.backdropView}>
                    <Image
                      source={landFlag[current.country]}
                      style={{width:width * 0.113, height:width * 0.113}}
                    ></Image>
                  </View>
                </TouchableHighlight>
              </Image>
            </View>;
        }
        acc.push(view);
        return acc;
      },[]);
    const listItems6 = this.state.lands.reduce((acc, current, index) => {
       let view;
        if (index > 34 && index < 42) {
          // 35-41
          view = <View style={styles.sourceSize} key={index}>
              <Image
                style={styles.source}
                source={landFlag[`P${index+1}`]}>
                <TouchableHighlight 
                  underlayColor={'rgba(252,252,252,0.5)'} 
                  onPress={this.onPressSourceButton.bind(this, current.fire, current.water, current.wood, current.stone, current.seed, `M${index+1}`, current.country)}>
                  <View style={styles.backdropView}>
                    <Image
                      source={landFlag[current.country]}
                      style={{width:width * 0.113, height:width * 0.113}}
                    ></Image>
                  </View>
                </TouchableHighlight>
              </Image>
            </View>;
        }
        acc.push(view);
        return acc;
      },[]);
    const listItems7 = this.state.lands.reduce((acc, current, index) => {
       let view;
        if (index > 41) {
          // 41-47
          view = <View style={styles.sourceSize} key={index}>
              <Image
                style={styles.source}
                source={landFlag[`P${index+1}`]}>
                <TouchableHighlight 
                  underlayColor={'rgba(252,252,252,0.5)'} 
                  onPress={this.onPressSourceButton.bind(this, current.fire, current.water, current.wood, current.stone, current.seed, `M${index+1}`, current.country)}>
                  <View style={styles.backdropView}>
                    <Image
                      source={landFlag[current.country]}
                      style={{width:width * 0.113, height:width * 0.113}}
                    ></Image>
                  </View>
                </TouchableHighlight>
              </Image>
            </View>;
        }
        acc.push(view);
        return acc;
      },[]);
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
              title="Loading..."
            />
          }
        >
        <View style={{flex:1, justifyContent:'center', alignItems:'center', width:width, height:height, top: height < 600 ? 0 : 15}}>
          <View style={{width: width*0.6,height:height * 0.05}}>
            <Image
              style={{width:'100%',height:height * 0.05}}
              source={require('../../images/land/top.png')}
            ></Image>
          </View>
          <LandBG url={'landBG'}>
            <View style={{flex:1, width:width, height:height * 0.93, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(255,255,255,0)'}}>
              <View style={{flex:1, width:width*0.8, height:height, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(255,255,255,0)'}}>
                <View style={styles.row1}>
                  <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                      {listItems1}
                  </View>
                </View>
                <View style={styles.row1}>
                  <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                      {listItems2}
                  </View>
                </View>
                <View style={styles.row1}>
                  <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                      {listItems3}
                  </View>
                </View>
                <View style={styles.row1}>
                  <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                      {listItems4}
                  </View>
                </View>
                <View style={styles.row1}>
                  <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                      {listItems5}
                  </View>
                </View>
                <View style={styles.row1}>
                  <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                      {listItems6}
                  </View>
                </View>
                <View style={styles.row1}>
                  <View style={{flex:1, width:'100%', height: '100%', flexDirection:'row', flexWrap: 'nowrap'}}>
                      {listItems7}
                  </View>
                </View>
              </View>
            </View>
          </LandBG>
          <View style={{marginTop: height < 600 ? 0 : 10, top: height < 600 ? 0 : -40}}>
            <View style={{width: width * 0.8, justifyContent: 'space-around', flexDirection: 'row', alignContent: 'space-between', flexWrap: 'nowrap'}}>
                <View style={{width:50,height: 50,flexShrink:1}}>
                    <Image
                      style={{width:50, height:50}}
                      source={landFlag[`fire`]}>
                    </Image>
                </View>
                <View style={{width:50,height: 50,flexShrink:1}}>
                    <Image
                      style={{width:50, height:50}}
                      source={landFlag[`k`]}>
                    </Image>
                </View>
                <View style={{width:50,height: 50,flexShrink:1}}>
                    <Image
                      style={{width:50, height:50}}
                      source={landFlag[`water`]}>
                    </Image>
                </View>
            </View>
            <View style={{width: width * 0.8, justifyContent: 'space-around', flexDirection: 'row', alignContent: 'space-between', flexWrap: 'nowrap'}}>
                <View style={{width:50,height: 50,flexShrink:1}}>
                  <View style={{width:50, height:50}}>
                    <Text style={styles.headline}>{Math.floor(this.state.my_fire)}</Text>
                  </View>
                </View>
                <View style={{width:50,height: 50,flexShrink:1}}>
                  <View style={{width:50, height:50}}>
                    <Text style={styles.headline}>{Math.floor(this.state.my_K)}</Text>
                  </View>
                </View>
                <View style={{width:50,height: 50,flexShrink:1}}>
                  <View style={{width:50, height:50}}>
                    <Text style={styles.headline}>{Math.floor(this.state.my_water)}</Text>
                  </View>
                </View>
            </View>
            <View style={{width: width * 0.8, justifyContent: 'space-around', flexDirection: 'row', alignContent: 'space-between', flexWrap: 'nowrap', top:-20}}>
                <View style={{width:50,height: 50,flexShrink:1}}>
                    <Image
                      style={{width:50, height:50}}
                      source={landFlag[`stone`]}>
                    </Image>
                </View>
                <View style={{width:50,height: 50,flexShrink:1}}>
                    <Image
                      style={{width:50, height:50}}
                      source={landFlag[`seed`]}>
                    </Image>
                </View>
                <View style={{width:50,height: 50,flexShrink:1}}>
                    <Image
                      style={{width:50, height:50}}
                      source={landFlag[`wood`]}>
                    </Image>
                </View>
            </View>
            <View style={{width: width * 0.8, justifyContent: 'space-around', flexDirection: 'row', alignContent: 'space-between', flexWrap: 'nowrap', top:-20}}>
                <View style={{width:50,height: 50,flexShrink:1}}>
                  <View style={{width:50, height:50}}>
                    <Text style={styles.headline}>{Math.floor(this.state.my_stone)}</Text>
                  </View>
                </View>
                <View style={{width:50,height: 50,flexShrink:1}}>
                  <View style={{width:50, height:50}}>
                    <Text style={styles.headline}>{Math.floor(this.state.my_seed)}</Text>
                  </View>
                </View>
                <View style={{width:50,height: 50,flexShrink:1}}>
                  <View style={{width:50, height:50}}>
                    <Text style={styles.headline}>{Math.floor(this.state.my_wood)}</Text>
                  </View>
                </View>
            </View>
          </View>
        </View>
        </ScrollView>
        <Modal
          style={[styles.modal]}
          position={"center"}
          ref={"buy_modal"}
          isOpen={this.state.isOpen}
        >
          <View style={styles.ImageShadow}>
            <Image 
              style={styles.backdrop} 
              source={require('../../images/short_modal_bg.png')}>
                <View style={styles.backdropSourceView}>
                  <TouchableOpacity onPress={() => this.setState({history_isOpen:false})} style={{position:'absolute',right:0,top:10, width:50, height:50}}
                  >
                    <View></View>
                  </TouchableOpacity>
                  <Text style={styles.backdropSourceViewHeadline}>購買此地需要花費</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:14,marginTop:10, marginRight:4}}>{this.state.fire}</Text>
                    <Modaliconimage url={'fire'} page4={true}>
                    </Modaliconimage>
                    <Text style={{fontSize:14,marginTop:10, marginRight:4}}>{this.state.water}</Text>
                    <Modaliconimage url={'water'} page4={true}>
                    </Modaliconimage>
                    <Text style={{fontSize:14,marginTop:10, marginRight:4}}>{this.state.stone}</Text>
                    <Modaliconimage url={'stone'} page4={true}>
                    </Modaliconimage>
                    <Text style={{fontSize:14,marginTop:10, marginRight:4}}>{this.state.seed}</Text>
                    <Modaliconimage url={'seed'} page4={true}>
                    </Modaliconimage>
                    <Text style={{fontSize:14,marginTop:10, marginRight:4}}>{this.state.wood}</Text>
                    <Modaliconimage url={'wood'} page4={true}>
                    </Modaliconimage>
                  </View>
                  <View style={{top:20}}>
                    <Button 
                      title={"確定購買"}
                      onPress={this.buy.bind(this)}
                    >
                    </Button>
                  </View>
                </View>
            </Image>
          </View>
        </Modal>
        <Spinner visible={this.state.visible1} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
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
    width: width * 0.113,
    height: width * 0.113,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    top:0,
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: 'rgb(0,0,0)'
  },
  sourceSize: {
    width:'100%',
    height: width * 0.113,
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
    left:135,
    bottom:110,
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
  row1: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'nowrap',
  },
});
