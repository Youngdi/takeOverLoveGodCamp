'use strict'
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, RefreshControl, ScrollView, Platform, AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GiftedChat } from 'react-native-gifted-chat';
import * as Config from '../../constants/config';

export default class TabThreeScreenThree extends React.Component {
  constructor(props) {
    const robot_url = [
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19366204_10203907845891987_2459007927381942638_n.jpg?oh=f84052ef9833f5c36054e0e48c7c2fa6&oe=599C82E9',
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19366453_10203907844011940_450462116541654372_n.jpg?oh=e0d4c5b8d2dfddb1571f9be50e662625&oe=59D83A27',
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19399443_10203907844051941_3551918138333844875_n.jpg?oh=12663412fedc4d180b5c9aaed9b203ed&oe=599BA0E7',
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19366204_10203907845891987_2459007927381942638_n.jpg?oh=f84052ef9833f5c36054e0e48c7c2fa6&oe=599C82E9',
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19366204_10203907845891987_2459007927381942638_n.jpg?oh=f84052ef9833f5c36054e0e48c7c2fa6&oe=599C82E9',
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19366204_10203907845891987_2459007927381942638_n.jpg?oh=f84052ef9833f5c36054e0e48c7c2fa6&oe=599C82E9',
    ];
    let robot_number = Math.floor(Math.random() * 6) + 1;
    super(props);
    this.state = {
      robot: robot_url[robot_number],
      messages: []
    };
    this.onSend = this.onSend.bind(this);
    this._id = 3;
  }
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: '你好我是隱藏NPC，你可以跟我聊天，但是我都會亂說話～',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: this.state.robot,
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
    const jwtToken = await AsyncStorage.getItem('@jwtToken');
    let response = await fetch(
      `https://${Config.SERVER_IP}:${Config.PORT}/robotapi`,
      {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
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
    if (response.data.code == 100000) {
      this.setState((previousState) => {
          const robot = {
            _id: this._id++,
            text: response.data.text,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: '大天團英雄',
              avatar: this.state.robot,
            },
          }
          return {
            messages: GiftedChat.append(previousState.messages, robot),
          };
      });
    } else if(response.data.code == 200000) {
      this.setState((previousState) => {
        const robot = {
          _id: this._id++,
          text: response.data.text + ':\n' + response.data.url,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: '大天團英雄',
            avatar: this.state.robot,
          },
        }
        return {
          messages: GiftedChat.append(previousState.messages, robot),
        };
      });
    }
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
