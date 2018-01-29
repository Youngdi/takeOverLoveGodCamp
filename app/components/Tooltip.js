import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import styled from "styled-components/native";
import ModalWrapper from 'react-native-modal-wrapper';
import I18n from 'react-native-i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {
  height: deviceHeight,
  width: deviceWidth,
} = Dimensions.get('window');

const Container = styled.View`
  height:140px;
  background-color: white;
  justify-content: space-around;
  align-items: center;
  borderTopWidth: 1px;
  border-color: rgba(0, 0, 0, 0.5);
`;
const TooltipRow = styled.View`
  margin-top:-10px;
  padding:10px;
  width:100%;
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const TooltipText = styled.Text`
  font-size:18px;
  fontWeight: 400;
  color: #333;
`;
const HighlightRow = styled.View`
  margin:10px;
  width:100%;
  display:flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const CloseRow = styled.View`
  marginTop:-18px;
  width:100%;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export default class Tooltip extends Component {
  render() {
    return (
      <ModalWrapper
        style={{zIndex:3}}
        isNative={false}
        onRequestClose={() => null}
        position='bottom'
        shouldAnimateOnRequestClose={false}
        showOverlay={false}
        visible={this.props.isTooltipModalVisible}>
        <Container>
          <TooltipRow>
              <TouchableOpacity 
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={() => this.props.handleBookmark()}
              >
              {this.props.bookmarkIsMatch ? <Ionicons name='ios-bookmark' size={35} />: <Ionicons name='ios-bookmark-outline' size={35} />}
              </TouchableOpacity>
              <TouchableOpacity
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                onPress={() => this.props.handleCopyVerse()}
              >
                <Ionicons
                  name='ios-copy-outline'
                  size={35}
                />
              </TouchableOpacity>
              
              <TouchableOpacity
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              >
                <Ionicons
                  name='ios-share-outline'
                  size={35}
                />
              </TouchableOpacity>
              <View style={{display:'flex', flexDirection:'row'}}>
                <TouchableOpacity
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  onPress={() => this.props.handleHighlight('#1A8B9D')}
                  style={{margin:5,backgroundColor:'#1A8B9D', width: 36, height: 36, borderColor:'#1A8B9D', borderWidth:4, borderStyle:'solid', borderRadius: 18}}
                />
                <TouchableOpacity
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  onPress={() => this.props.handleHighlight('#388E3C')}
                  style={{margin:5,backgroundColor:'#388E3C', width: 36, height: 36, borderColor:'#388E3C', borderWidth:4, borderStyle:'solid', borderRadius: 18}}
                />
                <TouchableOpacity
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  onPress={() => this.props.handleHighlight('transparent')}
                  style={{margin:5,backgroundColor:'#fff', width: 36, height: 36, borderColor:'black', borderWidth:0.5, borderStyle:'solid', borderRadius: 18}}
                />
              </View>
          </TooltipRow>
          <CloseRow>
            <TouchableOpacity
              onPress={() => this.props.closeTooltip()} 
              hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            >
              <TooltipText >{I18n.t('close_tooltip')}</TooltipText>
            </TouchableOpacity>
          </CloseRow>
      </Container>
    </ModalWrapper>
    );
  }
}