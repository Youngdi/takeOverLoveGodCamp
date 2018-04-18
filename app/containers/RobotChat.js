'use strict'
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, RefreshControl, ScrollView, Platform, AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GiftedChat } from 'react-native-gifted-chat';
import * as Config from '../constants/config';

export default class RobotChat extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'隱藏關卡',
    }
  };
  constructor(props) {
    const robot_url = [
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19366453_10203907844011940_450462116541654372_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeFtj_7qT91mCBc6U_vzrRkFqs6iUJRDB2wEN-yKe5RntIQEP-sBl5JXpIoPAHz6V9BgX9qnp9PIePlTFvHpmMpeH7HhCOQtlXwMgkhjByQ5gA&oh=39e29b7aae75d1eed8fae0816369cffe&oe=5B63BC27',
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19399443_10203907844051941_3551918138333844875_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeHrZrPanUzvNHTmyPoEgFTeh1_wO0plEvxRIrtxjr-dLLtEG15LwFcaN3ssduaXzLYvt-6T7ubHwFpNf1hfNjCoEuZmppv2aIyyAWND6u514g&oh=ee26560864ef18c6a27c3aa0cb9a3820&oe=5B2722E7',
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19366204_10203907845891987_2459007927381942638_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeEEOux_87YMh-tNoDzDlFlO3QzMZ1YgSVSPquwzbVFhrYRMtK7A8ccancxQv-Or4R47nQ2GQOGKnw54gAVdP4msDJSdInSrLOowwgvVKuRemg&oh=4b1626667b8e6df7e852036a52a1bb90&oe=5B4F91E9',
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19366453_10203907844011940_450462116541654372_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeFtj_7qT91mCBc6U_vzrRkFqs6iUJRDB2wEN-yKe5RntIQEP-sBl5JXpIoPAHz6V9BgX9qnp9PIePlTFvHpmMpeH7HhCOQtlXwMgkhjByQ5gA&oh=39e29b7aae75d1eed8fae0816369cffe&oe=5B63BC27',
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19399443_10203907844051941_3551918138333844875_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeHrZrPanUzvNHTmyPoEgFTeh1_wO0plEvxRIrtxjr-dLLtEG15LwFcaN3ssduaXzLYvt-6T7ubHwFpNf1hfNjCoEuZmppv2aIyyAWND6u514g&oh=ee26560864ef18c6a27c3aa0cb9a3820&oe=5B2722E7',
      'https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19366204_10203907845891987_2459007927381942638_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeEEOux_87YMh-tNoDzDlFlO3QzMZ1YgSVSPquwzbVFhrYRMtK7A8ccancxQv-Or4R47nQ2GQOGKnw54gAVdP4msDJSdInSrLOowwgvVKuRemg&oh=4b1626667b8e6df7e852036a52a1bb90&oe=5B4F91E9',
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
