import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, RefreshControl, ScrollView, AsyncStorage, Platform, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GiftedChat } from 'react-native-gifted-chat';
import { getMyUser, getMyCountry, api_buyResource, getFlagFromSetting, toChat, getChat } from '../api/api';
import * as R from 'ramda';

const nameMapping = {
	'M': 'Modern',
	'W': 'Wealth',
	'P': 'Power',
	'A': 'Academic',
	'L': 'Labor',
}
export default class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${nameMapping[navigation.state.params.RoomName]}戰略討論版`,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.state.params.init()}>
          <Ionicons
            name={'md-refresh'}
            size={24}
            style={{marginRight:20}}
          />
        </TouchableOpacity>
      ),
    }
  };
  state = {
    messages: [
      {
        _id: 'GM',
        text: '這是讓各個國家小隊彼此溝通戰術的地方',
        createdAt: new Date(),
        system: true,
      },
    ],
    limit: 10,
    more: true,
    text: '',
    currentText: '',
		username: '',
		name: '',
  }
  constructor(props) {
    super(props);
    this.init();
    global.socket.on('chat', (chatMessage) => {
      this.setState((prevState) => ({
        messages: GiftedChat.append(prevState.messages, chatMessage),
      }));
    });
  }
  init = async () => {
    const username = await AsyncStorage.getItem('@UserName');
    const userCountry = await AsyncStorage.getItem('@UserCountry');
    this.props.navigation.setParams({
        init: this.init,
        RoomName: userCountry,
    });
    const chatRecord = await getChat(this.state.limit);
    this.setState((prevState) => ({
      messages: chatRecord.data,
			username: Number(username.slice(3,5)) % 6 ? Number(username.slice(3,5)) % 6 : 6,
			name: username,
    }));
  }
  onSend = async (messages) => {
    this.setState(() => ({text: messages[0].text, currentText: ''}));
    setTimeout(() => this.handleTextChange(''), 0);
    const chatMessage = messages[0];
    const userCountry = await AsyncStorage.getItem('@UserCountry');
    chatMessage.country = userCountry;
    await toChat(chatMessage);
  }
  handleLoadEarlier = async () => {
    const api = await AppApi();
    const chatRecord = await api.getChat(this.state.limit + 10);
    this.setState((prevState) => ({
      limit: prevState.limit + 10,
      messages: chatRecord.data,
      more: prevState.messages.length != chatRecord.data.length,
    }));
  }
  handleTextChange = (text = '') => this.setState(() => ({ text }));
  
  onContentSizeChange(e) {
    const { contentSize } = e.nativeEvent;
    if (!contentSize) return;
    if (
      !this.contentSize ||
      this.contentSize.width !== contentSize.width ||
      this.contentSize.height !== contentSize.height
    ) {
      this.contentSize = contentSize;
    }
  }
  renderComposer = (props) => {
    return (
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        multiline={props.multiline}
        onChange={(e) => this.onContentSizeChange(e)}
        onContentSizeChange={(e) => this.onContentSizeChange(e)}
        onSubmitEditing={() => props.onSend({ text: R.path(['textInput', '_lastNativeText'], this) }, true)}
        onChangeText={(currentText) => {
            if (Platform.OS == 'ios') {
              this.setState(() => ({currentText}));
            } else {
              this.setState(() => ({currentText, text: currentText}));
            }
          }
        }
        style={[styles.textInput, props.textInputStyle, { height: props.composerHeight }]}
        autoFocus={props.textInputAutoFocus}
        value={this.state.text}
        accessibilityLabel={this.state.text || props.placeholder}
        enablesReturnKeyAutomatically
        underlineColorAndroid="transparent"
        keyboardAppearance={props.keyboardAppearance}
        ref={r => this.textInput = r}
        maxLength={props.textInputProps.maxLength}
      />
    )
  }
  renderSend = ({ text, containerStyle, onSend, children, textStyle, label }) => {
    if (this.state.currentText.trim().length > 0) {
      return (
        <TouchableOpacity
          style={[styles.container, containerStyle]}
          onPress={() => {
            onSend({ text: R.path(['textInput', '_lastNativeText'], this) }, true);
          }}
          accessibilityTraits="button"
        >
          <View>{children || <Text style={[styles.text, textStyle]}>{'Send'}</Text>}</View>
        </TouchableOpacity>
      );
    }
    return <View />;
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        onLoadEarlier={this.handleLoadEarlier}
        loadEarlier={this.state.more}
        user={{
          _id: this.state.name,
          name: this.state.username,
        }}
        isAnimated={true}
        renderSend={this.renderSend}
        renderComposer={this.renderComposer}
        bottomOffset={Platform.OS == 'ios' ? 50 : 0}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#0084ff',
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    marginTop: Platform.select({
      ios: 6,
      android: 0,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
    }),
  },
});