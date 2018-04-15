'use strict'
import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Platform } from 'react-native';
import Modal from 'react-native-modalbox';
export default class TabTwoScreenTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      board: '歡迎進入奇妙的世界！',
      isOpen: false,
      isDisabled: false,
      swipeToClose: false,
      sliderValue: 0.3
    };
  }
  render(){
    return(
      <View style={{
        flex:1,
        backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Button title={'modal'} onPress={() => this.refs.modal1.open()} style={styles.btn}>Basic modal</Button>
        <Modal
          style={[styles.modal, styles.modal1]}
          ref={"modal1"}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}>
            <Text style={styles.text}>Basic modal</Text>
            <Button title={'modal'} onPress={() => this.setState({swipeToClose: !this.state.swipeToClose})} style={styles.btn}>Disable swipeToClose({this.state.swipeToClose ? "true" : "false"})</Button>
        </Modal>

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
    marginTop: Platform.OS == 'ios' ? 25 : 0,
  },
  row1: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'nowrap',
  },
  row1Item: {
    flexShrink:1,
    width: '100%',
    height:50,
    margin: 0.5,
    backgroundColor: 'red',
  },
  wrapper: {
    paddingTop: 50,
    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal3: {
    height: 300,
    width: 300
  },

  modal4: {
    height: 300
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize: 22
  }
});