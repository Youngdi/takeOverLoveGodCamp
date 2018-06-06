var express = require('express')
var config = require('./config/index')
var cors = require('cors')
const Setting = require('./models/setting')
const Chat = require('./models/chat')
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
  socket.on('joinRoom', (country) => {
    socket.join(country)
  })
})
/* socket api */
app.post('/chat', (req, res) => {
  const chat = new Chat({
    country: req.body.country,
    user: req.body.user,
    createdAt: req.body.createdAt,
    text: req.body.text
  })
  chat.save(err => {
    if (err) return res.status(500).send(err)
    io.to(req.body.country).emit('chat', req.body)
    return res.status(200).send('chat successed')
  })
})
app.get('/chat/:country/:limit', (req, res) => {
  Chat.find({country: req.params.country}, null, {sort: {createdAt: -1}, limit: Number(req.params.limit)}, (e, chatRecord) => {
    if (e) {
      console.log(e)
      res.status(500).send(e)
    } else {
      res.status(200).send(chatRecord)
    }
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
