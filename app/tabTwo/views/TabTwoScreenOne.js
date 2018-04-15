'use strict'
import React from 'react';
import { TouchableWithoutFeedback, View, Text, TouchableOpacity, ScrollView, StyleSheet, RefreshControl, Button, Platform, AsyncStorage, Dimensions, TextInput, Image, Picker, Alert} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import modalC from '../../constants/modalC';
import { Divider, CheckBox } from 'react-native-elements';
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
import { goSecond } from '../../actions/tabTwoAction';
import Puzzle from '../../components/Puzzle';
import Modal from 'react-native-modalbox';
import * as puzzle from '../../constants/puzzle';
import * as Config from '../../constants/config';
import { getMyUser, api_buyHint, api_giveScore } from '../../api/api';
import ScorePuzzle from '../../components/ScorePuzzle';
import PuzzleIcon from '../../components/PuzzleIcon.js';

const { width, height } = Dimensions.get("window");
const K_Jewelry = require("../../images/modal/K_Jewelry.png");
const lockIcon = require("../../images/login1_lock.png");
export default class TabTwoScreenOne extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '九宮格解謎',
      headerTitleStyle:{
        alignSelf: 'center',
      }
    };
  };

  constructor(props) {// like initial function
    super(props);
    this.init();
    this.state = {
      isRefreshing: false,
      P1: "",
      P2: "",
      P3: "",
      P4: "",
      P5: "",
      P6: "",
      P7: "",
      P8: "",
      P9: "",
      P10: "",
      character: "",
      hint: "",
      isOpen: false,
      score_isOpen:false,
      visible: false,
      isDisabled: false,
      cost: "0",
      puzzle:"",
      puzzle_result:'W',
      country:'W',
      valuePWD:'',
      valueK:0,
    };
  }
  async init() {
    const user = await getMyUser();
    this.setState({
      P1: user.P1,
      P2: user.P2,
      P3: user.P3,
      P4: user.P4,
      P5: user.P5,
      P6: user.P6,
      P7: user.P7,
      P8: user.P8,
      P9: user.P9,
      P10: user.P10,
      country: user.country,
      isRefreshing: false,
      isOpen: false,
      score_isOpen: false,
      visible:false,
      valuePWD:'',
      valueK:0,
      cost: user.country == 'M' ? "25" : "30",
    });
  }
  _onRefresh() {
    this.setState({isRefreshing: true});
    this.init();
  }

  puzzle_click(P_result, P) {
    this.setState({
      puzzle: P,
    })
    if (P_result == 'W') {
      this.setState({
        character: puzzle[P].character,
        hint: puzzle[P].hint,
        score_isOpen: false,
      })
      this.refs.W_modal.open();
    }
    if (P_result == "L") {
      this.setState({
        score_isOpen: false,
      })
      this.refs.L_modal.open();
    }
    if (P_result == "N") {
      this.refs.N_modal.open();
    }
  }
  async giveScore() {
    this.setState({
      visible: true,
    });
    const flag = await api_giveScore(this.state.valueK, this.state.valuePWD, this.state.puzzle_result, this.state.puzzle);
    if (flag.data) {
      Alert.alert(
        '給分成功',
        this.state.puzzle_result == 'W' ? `闖關成功恭喜獲得資源\nK寶石:${this.state.valueK}`: `闖關失敗，真可惜，沒關係還有參加獎，資源K寶石:${this.state.valueK}`,
        [
          {text: '確定', onPress: () => this.init()},
          {text: '前往首頁查看資源', onPress: () => {
            this.setState({
              visible: false,
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
          {text: '確定', onPress: () => this.setState({visible: false,})}
        ],
          { cancelable: false }
      )
    }
    this.setState({isOpen: false});
  }
  async buyHint() {
    const flag = await api_buyHint(this.state.cost, this.state.puzzle, 'W');
    if (flag.data) {
      alert('購買成功');
      this.init();
    } else {
      alert('K寶不足');
    }
    this.setState({isOpen: false});
  }
  render() {
    const options = [
      "W",
      "L"
    ];
    function setSelectedOption(selectedOption){
      this.setState({
        puzzle_result: selectedOption,
        isOpen: false,
        score_isOpen: true,
      });
    }
    function renderOption(option, selected, onSelect, index){
      const style = selected ? { fontWeight: 'bold'} : {};
      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
      );
    }
    function renderContainer(optionNodes){
      return <View>{optionNodes}</View>;
    }
    return (
      <View style={{backgroundColor:'rgb(164,183,192)'}}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              title="Loading..."
            />
          }
        >
          <View style={{flex:1, width:width, height:height * 0.93, justifyContent:'center', alignItems:'center', backgroundColor:'rgb(164,183,192)'}}>
            <View style={{flex:1, width:width*0.8, height:height, justifyContent:'center', alignItems:'center', backgroundColor:'rgb(164,183,192)'}}>
              <View style={{width:'100%',height:height * 0.25}}>
                <Image
                  style={{width:'100%',height:height * 0.25}}
                  source={require('../../images/puzzle/top.png')}
                ></Image>
              </View>
              <View style={styles.row1}>
                <Puzzle P_result={this.state.P1} P={'P1'} onClick={this.puzzle_click.bind(this, this.state.P1, 'P1')} />
                <Puzzle P_result={this.state.P2} P={'P2'} onClick={this.puzzle_click.bind(this, this.state.P2, 'P2')} />
                <Puzzle P_result={this.state.P3} P={'P3'} onClick={this.puzzle_click.bind(this, this.state.P3, 'P3')} />
              </View>
              <View style={styles.row1}>
                <Puzzle P_result={this.state.P4} P={'P4'} onClick={this.puzzle_click.bind(this, this.state.P4, 'P4')} />
                <Puzzle P_result={this.state.P5} P={'P5'} onClick={this.puzzle_click.bind(this, this.state.P5, 'P5')} />
                <Puzzle P_result={this.state.P6} P={'P6'} onClick={this.puzzle_click.bind(this, this.state.P6, 'P6')} />
              </View>
              <View style={styles.row1}>
                <Puzzle P_result={this.state.P7} P={'P7'} onClick={this.puzzle_click.bind(this, this.state.P7, 'P7')} />
                <Puzzle P_result={this.state.P8} P={'P8'} onClick={this.puzzle_click.bind(this, this.state.P8, 'P8')} />
                <Puzzle P_result={this.state.P9} P={'P9'} onClick={this.puzzle_click.bind(this, this.state.P9, 'P9')} />
              </View>
              <TouchableOpacity
                onPress={this.puzzle_click.bind(this, this.state.P10, 'P10')}
                style={{
                  width: '100%',
                  height: (height < 540) ? 80 : 100,
                  margin: 5,
                }}>
                <PuzzleIcon url={this.state.P10 == 'N' ? 'P10': 'P10W'}></PuzzleIcon>
              </TouchableOpacity>
              <View style={{width:'100%',height:height*0.1}}>
                <Image
                  style={{width:'100%',height:height*0.1}}
                  source={require('../../images/puzzle/buttom.png')}
                ></Image>
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal
        style={[styles.modal]}
        position={"center"}
        ref={"W_modal"}
        isOpen={this.state.isOpen}
        swipeToClose={false}
        >
          <View style={styles.ImageShadow}>
            <Image
            style={styles.backdrop}
            source={require('../../images/short_modal_bg.png')}>
              <View style={{flex:1,width:330,height:400,justifyContent: 'flex-start',alignItems: 'center',backgroundColor: 'rgba(0,0,0,0)',}}>
                <Text onPress={() => this.setState({isOpen:false})} style={{top:10,left:130, fontSize: 20, width:50, height:50, fontWeight: '800'}}>{''}</Text>
                <View style={{flex:1, flexWrap:'nowrap', flexDirection:'row', justifyContent:'center', alignItems:'center',right:6, top:-40}}>
                  <Image
                    style={{width:30,height:70, marginRight:20}}
                    source={modalC[this.state.country]}
                  ></Image>
                  <Text style={{fontSize: 24,fontWeight: '800', color: 'rgb(60,60,60)', marginBottom:25}}>{this.state.character}</Text>
                </View>
                <ScrollView style={{top:-50,paddingLeft: 40,paddingRight: 40}}>
                  <Text style={{color: "black",fontSize: 18,letterSpacing:0.5,lineHeight: Platform.OS === 'ios' ? 25 : 30}}>{this.state.hint}</Text>
                </ScrollView>
              </View>
            </Image>
          </View>
        </Modal>
        <Modal
          style={[styles.modal]}
          position={"center"}
          ref={"L_modal"}
          isOpen={this.state.isOpen}
        >
          <View style={styles.ImageShadow}>
            <Image
            style={styles.backdrop}
            source={require('../../images/short_modal_bg.png')}>
              <View style={styles.backdropSourceView}>
                <Text onPress={() => this.setState({isOpen:false})} style={{top:-35,left:135, fontSize: 20, width:50, height:50, fontWeight: '800'}}>{''}</Text>
                <Text style={{fontSize:24, marginBottom:50, fontWeight: '800',color: 'rgb(60,60,60)'}}>Lose</Text>
                <Text style={{fontSize:18, color: "#ff4a4a",}}>是否花 {this.state.cost} 個K寶石購買提示?</Text>
                <View style={styles.btnContainer}>
                  <View style={{marginRight:60}}>
                    <Button 
                      title={"考慮一下"}
                      onPress={() => this.setState({isOpen: false})}
                    >
                    </Button>
                  </View>
                  <View>
                    <Button 
                      title={"確定購買"}
                      onPress={this.buyHint.bind(this)}
                    >
                    </Button>
                  </View>
                </View>
              </View>
            </Image>
          </View>
        </Modal>
        <Modal
          style={[styles.modal]}
          position={"center"}
          ref={"N_modal"}
          isOpen={this.state.score_isOpen}
        >
          <View style={styles.ImageShadow}>
            <Image
            style={styles.backdrop}
            source={require('../../images/short_modal_bg.png')}>
              <View style={styles.backdropSourceView}>
                <Text onPress={() => this.setState({isOpen:false})} style={{top:10,left:135, fontSize: 20, width:50, height:50, fontWeight: '800'}}>{''}</Text>
                <View style={{flex:1, width:'70%', marginTop:20}}>
                  <SegmentedControls
                    tint={'#f80046'}
                    selectedTint= {'white'}
                    backTint= {'white'}
                    options={ options }
                    allowFontScaling={ false } // default: true
                    onSelection={ setSelectedOption.bind(this) }
                    selectedOption={ this.state.puzzle_result }
                    optionStyle={{fontFamily: 'AvenirNext-Medium'}}
                    optionContainerStyle={{flex: 1}}
                  />
                  <View style={{flex:1}}>  
                    <View style={{flexDirection: "row",marginVertical: 10,height: 40,borderBottomWidth: 1,borderBottomColor: "#CCC"}}>
                      <View style={{paddingHorizontal: 7,alignItems: "center",justifyContent: "center"}}>
                        <Image source={K_Jewelry} style={styles.icon} resizeMode="contain" />
                      </View>
                      <TextInput 
                        defaultValue={'0'}
                        keyboardType={'numeric'} 
                        placeholder="K寶石" 
                        placeholderTextColor="#8495a0" 
                        style={styles.input} 
                        onChangeText={(K) => this.setState({valueK: K, score_isOpen: true})}
                      />
                    </View>
                    <View style={{flexDirection: "row",marginVertical: 10,height: 40,borderBottomWidth: 1,borderBottomColor: "#CCC"}}>
                      <View style={{paddingHorizontal: 7,alignItems: "center",justifyContent: "center"}}>
                        <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                      </View>
                      <TextInput
                        placeholder="關主密碼"
                        placeholderTextColor="#8495a0"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={(password) => this.setState({valuePWD: password, score_isOpen: true})}
                      />
                    </View>
                    <View style={{marginTop:10}}>
                      <Button 
                        title={"確定給分"}
                        onPress={this.giveScore.bind(this)}
                      >
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            </Image>
          </View>
        </Modal>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  contentContainer: {
    paddingVertical: 1,
    backgroundColor:'rgb(164,183,192)'
  },
  row1: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'nowrap',
  },
  baseText: {
   fontFamily: 'Cochin',
   width: 100,
   height: 100,
  },
  titleText: {
     fontSize: 20,
     fontWeight: 'bold',
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
  backdropSourceView:{
    flex:1,
    width:330,
    height:330,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  backdropSourceViewClose:{
    left:135,
    bottom:60,
    fontSize: 20,
    fontWeight: '800',
    color: 'rgb(255,255,255)'
  },
  backdropSourceViewClose1:{
    top:50,
    left:135,
    fontSize: 20,
    fontWeight: '800',
    color: 'rgb(255,255,255)'
  },
  backdropSourceViewClose2:{
    left: 135,
    top: 15,
    fontSize: 20,
    fontWeight: '800',
    color: 'rgb(255,255,255)'
  },
  backdropSourceViewHeadline1:{
    top:-50,
    fontSize: 24,
    fontWeight: '800',
    color: 'rgb(60,60,60)'
  },
  text1: {
    color: "black",
    height: 200,
    fontSize: 18,
    top:-30,
    paddingLeft: 40,
    paddingRight: 40,
    letterSpacing:0.5,
    lineHeight: Platform.OS === 'ios' ? 25 : 30
  },
  text2: {
    color: "#ff4a4a",
    fontSize: 18,
  },
  btnContainer: {
    marginTop:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  btn: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    width: 100,
    color: 'white',
    letterSpacing: 2,
  },
  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  wrongPasswordText: {
    color: "#D20000",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
    marginTop:5,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});