'use strict'
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, RefreshControl, ScrollView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GiftedChat } from 'react-native-gifted-chat';
import * as Config from '../../constants/config';

export default class TabFourScreenTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
    this._id = 3;
  }
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: '你好我是NPC，你可以跟我聊天，但是我都會亂說話',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://scontent.xx.fbcdn.net/v/t1.0-9/1185131_10151777143846435_1112463788_n.jpg?oh=8373e9bcba028812e44166c631e1ad1b&oe=59D91B8B',
          },
        },
      ],
    });
  }
  async onSend(messages = []) {
    this.setState((previousState) => {
      return {
          messages: GiftedChat.append(previousState.messages, messages),
      };
    });
    let response = await fetch(
      `https://${Config.SERVER_IP}:${Config.PORT}/robotapi`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          'info': messages[0].text,
          'id': this._id++
        })
     }
    )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return error;
    });
    this.setState((previousState) => {
        const robot = {
          _id: this._id++,
          text: response.data,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: '大天團英雄',
            avatar: 'http://imgur.com/a/fRHFF',
          },
        }
        return {
          messages: GiftedChat.append(previousState.messages, robot),
        };
    });
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
        isAnimated={true}
      />
    );
  }
}
