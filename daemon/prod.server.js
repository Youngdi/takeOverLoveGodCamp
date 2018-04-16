var express = require('express')
var config = require('./config/index')
var cors = require('cors')
const Setting = require('./models/setting')
var port = process.env.PORT || config.dev.port

var app = express()

var router = express.Router()
// 用于静态展示入口
router.get('/', (req, res, next) => {
  req.url = './index.html'
  next()
})

app.use(router)

/* 引入 */
var mongoose = require('mongoose')
// 日志文件
var morgan = require('morgan')
// sesstion 存储
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
// 用于异步回调
mongoose.Promise = require('bluebird')
const mongoConfig = process.env.mongoConfig || 'mongodb://localhost:27017/takeitover'
global.db = mongoose.connect(mongoConfig)
app.use(cors())
// 服务器提交的数据json化

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// sesstion 存储
app.use(cookieParser())
app.use(session({
  secret: 'takeItover',
  resave: false,
  saveUninitialized: true
}))

// var env = process.env.NODE_ENV || 'development'
if (app.get('env') === 'development') {
  app.set('showStackError', true)
  app.use(morgan(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug', true)
}

var server = app.listen(port)

// websocket
// var http = require('http').Server(app);
var io = require('socket.io')(server)
// var Message = require('./models/message')
var users = {}
io.on('connection', (socket) => {
  // 监听用户发布聊天内容
  socket.on('message', (obj) => {
    // 向所有客户端广播发布的消息
    io.emit('message', obj)
  })
})
app.post('/update_board', (req, res) => {
  // console.log(io)
  io.emit('notification', {data: req.body.board})
  Setting.update(
    {},
    {
    $set: {
      board: req.body.board
    }
  }, (e, user) => {
    if (e) {
      console.log(e)
    } else {
      res.end()
    }
  })
})
app.post('/update_password', (req, res) => {
  Setting.update(
    {},
    {
    $set: {
      password: req.body.password
    }
  }, (e, user) => {
    if (e) {
      console.log(e)
    } else {
      res.end()
    }
  })
})
require('./config/routes')(app, io)
// 声明静态资源地址
app.use(express.static('./dist'))
