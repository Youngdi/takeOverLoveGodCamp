# 2017 TakeItOver夏令營App

[![N|Solid](http://www.bannerch.org/images/main%20optic/logo.svg)](http://www.bannerch.org/)

Banner Church summer camp 2017旌旗夏令營配合大地遊戲使用的App

# 開源專案協作人員注意事項!

  - 1.)Fork後再發push的request
  - 2.)保持愉快心情
***
# Contributors
##### ✰ Bill Youngdi 負責項目：
  - 前後端架構設計及實作(API)
  - 開設工作坊教學
  - 組織及分配工作
  - react-native-fcm的串接
  - react-native-qrcode-scanner的串接
  - IOS & Android 上架
  - 整合大家的code及Debug
##### ✰ Forest 負責項目：
  - 規劃及設計App各個關卡的遊戲機制(資源表...等等)
  - 統合最終App畫面呈現的流程圖
  - 協助開發程式介面及設計師溝通畫面整體性
  - 測試及模擬App於實際場域中的各種情形
  - 建立遊戲機制所需參數的後端資料表(九宮格、領土爭奪戰、資源點表)
  - 會員帳號密碼建檔(Excel)以及輸入至資料庫中
  - 後台介面及串接
  - 介面UI名稱
##### ✰ Angus Wan 負責項目：
  - 組織及做時程的規劃
  - 發想遊戲機制中的可能性
  - 協助測試及模擬App於實際場域中的各種情形
  - 介面UI名稱
##### ✰ Sam Wang 負責項目：
  - 協助前端程式開發，包含介面及套件的串接
  - 試著實作整個尋寶頁面及與後端API的串接
  - 實作首頁Drawer中的靜態頁面國家資料、行程表、工作坊
##### ✰ Bomi Chen 負責項目：
  - 協助前端程式開發，包含介面及套件的串接
  - 優化整體App的介面UI設計及與設計師進行溝通
  - 試著實作整個九宮格頁面及與後端API的串接
  - 實作首頁Drawer中的靜態頁面國家資料、行程表、工作坊
  
##### ✰ 陳康康 負責項目：
  - 協助前端程式開發，包含介面及套件的串接
  - 實作首頁的頁面及與後端API的串接
  - 實作首頁Drawer中的靜態頁面國家資料、行程表、工作坊
##### ✰ Thomas 負責項目：
  - 與Forest討論整體App的介面風格及設計
  - App Icon、launch page、UI、國家icon
  - 景文科大資源點背景圖(?格)
  - 領土爭奪戰配合景文科大切分圖(49格)
  - 行程表圖
  - 工作坊講員頭像
  - 各種資源(上架)的Icon圖

### Tech
This app uses a number of open source projects to work properly:

* [React-Native](https://facebook.github.io/react-native/) - Build mobile apps with React
* [React-Native-FCM](https://github.com/evollu/react-native-fcm) - Help you connect with firebase cloud message(FCM)
* [React-Native-Qrcode-Scanner](https://github.com/moaazsidat/react-native-qrcode-scanner) - A QR code scanner component for React Native
* [React-Redux](https://github.com/reactjs/react-redux) - Official React bindings for Redux for DataFlow
* [Redux](https://socket.io/) - Redux is a predictable state container for JavaScript apps.
* [Redux-Cycles](https://github.com/cyclejs-community/redux-cycles) - Handle redux async actions using Cycle.js.
* [Redux Online DevTools server](http://remotedev.io/local/) - Already set up in configureStore.js
* [Remote Redux DevTools monitor on React Native Debugger](https://github.com/jhen0409/remote-redux-devtools-on-debugger) - React Native debugger for Redux
* [Socket io](https://socket.io/) - Reliable real-time engine
* [FlexBox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - CSS layout
* [react-native-material-ui](https://github.com/xotahal/react-native-material-ui) - great UI boilerplate for modern web apps
* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [Express](https://github.com/expressjs/express) - fast node.js network app framework [@tjholowaychuk]
* [MongoDB](https://www.mongodb.com/) - noSQL DataBase
* [Firebase](https://firebase.google.com/) - analyze and send cloud messages to your user

***

### Installation

TakeItOver App requires [Node.js](https://nodejs.org/) v7.4.0+ to run.

Please Follow the article first to set your Development Environment:

[React Native 入門環境設定](http://ithelp.ithome.com.tw/articles/10186743)

Install the dependencies and devDependencies before your start.
#### step1 -Clone一份程式到你的本機
```sh
$ git clone https://github.com/Youngdi/TakeItOver.git 
```
#### step2 -進到專案目錄安裝需要的套件
```sh
$ npm install 
```
#### step3 -安裝App到iphone模擬機上(only for mac => Xcode installed)
```sh
$ react-native run-ios
```
#### step4 -安裝App到Android模擬機上(for mac and windows)
```sh
$ react-native run-android
```

***
License
----
MIT

