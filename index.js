import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import io from 'socket.io-client';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import CodePush from "react-native-code-push";
import App from './app/containers/App';
class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.socket = io(`http://bytday.com:8083`, { transports: ['websocket'] });
  }
  componentDidMount() {
    global.socket = this.socket;
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
    });
    FCM.getInitialNotification().then(notif => {
      FCM.setBadgeNumber(0);
      console.log("INITIAL NOTIFICATION", notif)
    });
    this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
      if (Platform.OS == 'ios') {
        if (notif.local_notification) {
          FCM.setBadgeNumber(0);
          // this.setupScheduleLocalNotification();
          return;
        } else {
          // alert(notif.aps.alert);
        }
      } else {
          // alert(notif.fcm.body);
      }
      if(notif.local_notification){
        return;
      }
      if(notif.opened_from_tray){
        return;
      }
      if(Platform.OS ==='ios') {
        switch(notif._notificationType){
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
            break;
          case NotificationType.NotificationResponse:
            notif.finish();
            break;
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
            break;
        }
      }
      this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
        console.log("TOKEN (refreshUnsubscribe)", token);
      });
    });
    // CodePush.sync({ updateDialog: false, installMode: CodePush.InstallMode.IMMEDIATE },
    //   (status) => {
    //     switch (status) {
    //       case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
    //         this.setState({showDownloadingModal: false});
    //         break;
    //       case CodePush.SyncStatus.INSTALLING_UPDATE:
    //         this.setState({showInstalling: true});
    //         break;
    //       case CodePush.SyncStatus.UPDATE_INSTALLED:
    //         this.setState({showDownloadingModal: false});
    //         break;
    //     }
    //   },
    //   ({ receivedBytes, totalBytes, }) => {
    //       this.setState({downloadProgress: receivedBytes / totalBytes * 100});
    //   }
    // );
  }
  setupScheduleLocalNotification = () => {
    FCM.cancelLocalNotification('nightReminders');
    FCM.cancelLocalNotification('dayReminders');
    FCM.scheduleLocalNotification({
      fire_date: moment(`${moment().format('YYYY-MM-DD')} 08:00:00`).toDate().getTime(),
      id: 'dayReminders',
      title: '早起靈修，開啟你美好的一天',
      body: this.getDiaryBiblePhrase('每日一'),
      priority: 'high', 
      show_in_foreground: true,
      sound: 'default',
      local: true,
      badge: 1,
      vibrate: 500,
      wake_screen: true
    });
    FCM.scheduleLocalNotification({
      fire_date: moment(`${moment().format('YYYY-MM-DD')} 22:00:00`).toDate().getTime(),
      id: 'nightReminders',
      title: '睡前靈修，願主與你一同進入夢鄉',
      body: this.getDiaryBiblePhrase('睡前'),
      priority: 'high', 
      show_in_foreground: true,
      sound: 'default',
      local: true,
      badge: 1,
      vibrate: 500,
      wake_screen: true
    });
  }
  render() {
    return (
      <App />
    )
  }
}
AppRegistry.registerComponent('BYTBibleDiary', () => AppProvider);
