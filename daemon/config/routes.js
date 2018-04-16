const superagent = require('superagent')
const moment = require('moment')
const tz = require('moment-timezone')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
var OpenCC = require('opencc')
var openst = new OpenCC('s2t.json')
var opents = new OpenCC('t2s.json')
const User = require('../models/user')
const Map = require('../models/map')
const Country = require('../models/country')
const Setting = require('../models/setting')
const Question = require('../models/question')
const Feedback = require('../models/feedback')
// COPY Release/s2t.json
// COPY Release/t2s.json
// COPY Release/s2tw.json
// COPY Release/s2twp.json
// COPY Release/tw2s.json
// COPY Release/tw2sp.json
// COPY Release/t2tw.json
// COPY Release/s2hk.json
// COPY Release/hk2s.json
// COPY Release/t2hk.json
moment.locale('zh-tw')

module.exports = (app, io) => {
  // app.use((req, res, next) => {
  //    next()
  // })
  app.use(expressJWT({
    secret: 'takeover',
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.cookies.bytday) {
        return req.cookies.bytday
      } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
      } else if (req.query && req.query.token) {
        return req.query.token
      }
      return null
    }
  }).unless({
    path: [{
      url: /\/*/,
      methods: ['GET']
    }, {
      url: '/login',
      methods: ['POST']
    }, {
      url: '/manager_login',
      methods: ['POST']
    }]
  }))
  app.post('/login', (req, res) => {
    User.find({
        name: req.body.username,
        password: req.body.password
      },
      (e, user) => {
        if (e) {
          console.log(e)
          res.send({
            loggedIn: false
          })
          res.end()
        } else {
          if (user.length === 0) {
            res.status(401).send({
              loggedIn: false
            })
            // res.send({loggedIn: false})
            res.end()
          } else {
            const myToken = jwt.sign({
              user,
              loggedIn: true
            }, 'takeover')
            
            // res.status(200).json(myToken)
            res.send({loggedIn: true, user, myToken})
            res.end()
          }
        }
      })
  })
  app.get('/get_record', (req, res) => {
    Setting.find({}, (e, Setting) => {
      if (e) {
        console.log(e)
      } else {
        var data = {}
        data.day1_resource = Setting[0].day1_resource
        data.day1_puzzle = Setting[0].day1_puzzle
        data.day3_land = Setting[0].day3_land
        data.day3_resource = Setting[0].day3_resource
        res.send(data)
        res.end()
      }
    })
  })
  app.get('/check_login', (req, res) => {
    if (req.session.username) {
      User.find({
        name: req.session.username
      }, (e, user) => {
        res.send({
          loggedIn: true,
          user
        })
      })
    } else {
      res.send({
        loggedIn: false
      })
    }
  })
  app.get('/manager_check_login', (req, res) => {
    if (req.session.manager_username) {
      res.send({
        need_login: false
      })
    } else {
      res.send({
        need_login: true
      })
    }
  })
  app.get('/logout', (req, res) => {
    // clear the remember me cookie when logging out
    req.session.destroy()
    res.end()
  })
  app.get('/manager_logout', (req, res) => {
    req.session.destroy()
    res.end()
  })
  app.post('/manager_login', (req, res) => {
    if (req.body.user.username === 'BYT100' && req.body.user.password === 'ilovejesus') {
      const myToken = jwt.sign({}, 'takeover')
      req.session.manager_username = req.body.user.username
      res.cookie('bytday', myToken)
      res.send({
        logined: true,
        invaild: false
      })
      res.end()
    } else {
      res.send({
        logined: false,
        invaild: true
      })
      res.end()
    }
  })
  app.get('/get_user', (req, res) => {
    User.find({}, (e, user) => {
      if (e) {
        console.log(e)
      } else {
        res.send(user)
        res.end()
      }
    })
  })
  app.post('/get_my_user', (req, res) => {
    User.find({
      name: req.body.name
    }, (e, user) => {
      if (e) {
        console.log(e)
      } else {
        res.send(user)
        res.end()
      }
    })
  })
  app.get('/get_question', (req, res) => {
    Question.find({}, (e, question) => {
      if (e) {
        console.log(e)
      } else {
        res.send(question)
        res.end()
      }
    })
  })
  app.get('/get_feedback', (req, res) => {
    Feedback.find({}, (e, feedback) => {
      if (e) {
        console.log(e)
      } else {
        res.send(feedback)
        res.end()
      }
    })
  })
  app.get('/get_setting', (req, res) => {
    Setting.find({}, (e, settings) => {
      if (e) {
        console.log(e)
      } else {
        res.send(settings)
        res.end()
      }
    })
  })
  app.get('/get_map', (req, res) => {
    Map.find({}, (e, country) => {
      if (e) {
        console.log(e)
      } else {
        res.send(country)
        res.end()
      }
    })
  })
  app.post('/update_map', (req, res) => {
    Map.update({
      map_name: req.body.map_name
    }, {
      $set: {
        country: req.body.country
      }
    }, (e, user) => {
      if (e) {
        console.log(e)
      } else {
        res.end()
      }
    })
    Setting.update({}, {
      $push: {
        day3_land: '時間為：' + moment().tz('Asia/Taipei').format('llll') + ' /地圖名稱：' + req.body.map_name + ' /country:' + req.body.country
      }
    }, function (e, data) {
      console.log(data)
    })
  })
  app.post('/get_my_country', (req, res) => {
    Country.find({
      country: req.body.country
    }, (e, country) => {
      if (e) {
        console.log(e)
      } else {
        res.send(country)
        res.end()
      }
    })
  })
  app.get('/get_country', (req, res) => {
    Country.find({}, (e, country) => {
      if (e) {
        console.log(e)
      } else {
        res.send(country)
        res.end()
      }
    })
  })
  app.post('/update_country', (req, res) => {
    Country.update({
      country: req.body.name
    }, {
      $inc: {
        K: req.body.K,
        water: req.body.water,
        fire: req.body.fire,
        wood: req.body.wood,
        stone: req.body.stone,
        seed: req.body.seed
      }
    }, (e, user) => {
      if (e) {
        console.log(e)
      } else {
        res.end()
      }
    })
    Setting.update({}, {
      $push: {
        day3_resource: '時間為：' + moment().tz('Asia/Taipei').format('llll') + ' /國家：' + req.body.name + ' /K寶石:' + req.body.K + ' /水：' + req.body.water + ' /火：' + req.body.fire + ' /木頭：' + req.body.wood + ' /石頭：' + req.body.stone + ' /種子：' + req.body.seed
      }
    }, function (e, data) {
      console.log(data)
    })
  })
  app.post('/update_user_data', (req, res) => {
    User.update({
      name: req.body.name
    }, {
      $set: {
        P1: req.body.P1,
        P2: req.body.P2,
        P3: req.body.P3,
        P4: req.body.P4,
        P5: req.body.P5,
        P6: req.body.P6,
        P7: req.body.P7,
        P8: req.body.P8,
        P9: req.body.P9,
        P10: req.body.P10
      },
      $inc: {
        K: req.body.K,
        water: req.body.water,
        fire: req.body.fire,
        wood: req.body.wood,
        stone: req.body.stone,
        seed: req.body.seed
      }
    }, (e, user) => {
      if (e) {
        console.log(e)
      } else {
        res.end()
      }
    })
  })
  app.post('/update_user_puzzle', (req, res) => {
    User.update({
      name: req.body.name
    }, {
      $set: {
        P1: req.body.P1,
        P2: req.body.P2,
        P3: req.body.P3,
        P4: req.body.P4,
        P5: req.body.P5,
        P6: req.body.P6,
        P7: req.body.P7,
        P8: req.body.P8,
        P9: req.body.P9,
        P10: req.body.P10
      }
    }, (e, user) => {
      if (e) {
        console.log(e)
      } else {
        res.end()
      }
    })
    Setting.update({}, {
      $push: {
        day1_puzzle: '時間為：' + moment().tz('Asia/Taipei').format('llll') + ' /組別：' + req.body.name + ' /P1:' + req.body.P1 + ' /P2：' + req.body.P2 + ' /P3：' + req.body.P3 + ' /P4：' + req.body.P4 + ' /P5：' + req.body.P5 + ' /P6：' + req.body.P6 + ' /P7：' + req.body.P7 + ' /P8：' + req.body.P8 + ' /P9：' + req.body.P9 + ' /P10：' + req.body.P10
      }
    }, function (e, data) {
      console.log(data)
    })
  })
  app.post('/update_user_puzzle_single', (req, res) => {
    var puzzleUpdate = {
      $set: {}
    }
    puzzleUpdate.$set[req.body.puzzle] = req.body.puzzle_result
    User.update({
        name: req.body.name
      },
      puzzleUpdate,
      (e, user) => {
        if (e) {
          console.log(e)
        } else {
          res.end()
        }
      })
    Setting.update({}, {
      $push: {
        day1_puzzle: '時間為：' + moment().tz('Asia/Taipei').format('llll') + ' /組別：' + req.body.name + ' /' + req.body.puzzle + ':' + req.body.puzzle_result
      }
    }, function (e, data) {
      console.log(data)
    })
  })
  app.post('/puzzle_give_score', (req, res) => {
    var puzzleUpdate = {
      $set: {}
    }
    puzzleUpdate.$set[req.body.puzzle] = req.body.puzzle_result
    Setting.find({}, (e, setting) => {
      if (req.body.password === setting[0].password) {
        User.update({
            name: req.body.name
          },
          puzzleUpdate,
          (e, user) => {
            if (e) console.log(e)
          })
        User.update({
            name: req.body.name
          }, {
            $inc: {
              K: req.body.K
            }
          },
          (e, user) => {
            if (e) console.log(e)
          })
        Country.update({
            country: req.body.country
          }, {
            $inc: {
              K: req.body.K
            }
          },
          (e, user) => {
            if (e) console.log(e)
          })
        Setting.update({}, {
          $push: {
            day1_puzzle: '時間為：' + moment().tz('Asia/Taipei').format('llll') + ' /組別：' + req.body.name + ' /' + req.body.puzzle + ':' + req.body.puzzle_result + '/K寶:' + req.body.K
          }
        }, function (e, data) {})
        res.send({
          data: true
        })
        res.end()
      } else {
        res.send({
          data: false
        })
        res.end()
      }
    })
  })
  app.post('/give_score_day3', (req, res) => {
    GiveScore()
    async function GiveScore() {
      User.find({
        name: req.body.name
      }, async(e, user) => {
        if (e) {
          console.log(e)
        } else {
          Setting.find({}, async(e, setting) => {
            if (req.body.password === setting[0].password) {
              const B = {}
              B.B1 = user[0].B1
              B.B2 = user[0].B2
              B.B3 = user[0].B3
              B.B4 = user[0].B4
              B.B5 = user[0].B5
              B.B6 = user[0].B6
              await updateC(user[0].B1, user[0].B2, user[0].B3, user[0].B4, user[0].B5, user[0].B6)
              res.send({
                data: true,
                B
              })
              res.end()
            } else {
              res.send({
                data: false
              })
              res.end()
            }
          })
        }
      })
    }

    function updateC(B1, B2, B3, B4, B5, B6) {
      Country.update({
          country: req.body.country
        }, {
          $inc: {
            K: req.body.K * B1,
            fire: req.body.fire * B2,
            water: req.body.water * B3,
            wood: req.body.wood * B4,
            stone: req.body.stone * B5,
            seed: req.body.seed * B6
          }
        },
        (e, user) => {
          if (e) console.log(e)
        })
      Setting.update({}, {
        $push: {
          day3_resource: '時間為：' + moment().tz('Asia/Taipei').format('llll') + ' /國家：' + req.body.name + ' /K寶石:' + req.body.K * B1 + ' /水：' + req.body.water * B3 + ' /火：' + req.body.fire * B2 + ' /木頭：' + req.body.wood * B4 + ' /石頭：' + req.body.stone * B5 + ' /種子：' + req.body.seed * B6
        }
      }, function (e, data) {
        console.log(data)
      })
    }
  })
  app.post('/buy_resource', (req, res) => {
    var resourceUpdate = {
      $inc: {}
    }
    resourceUpdate.$inc[req.body.resource] = req.body.K / 3
    buyResource()
    async function buyResource() {
      User.find({
        name: req.body.name
      }, async(e, user) => {
        if (e) {
          console.log(e)
        } else {
          if (req.body.leftK >= 3 && req.body.K >= 3 && req.body.K % 3 === 0 && req.body.leftK >= req.body.K) {
            await updateK()
            await updateR()
            res.send({
              data: true
            })
            res.end()
          } else {
            res.send({
              data: false
            })
            res.end()
          }
        }
      })
    }

    function updateK() {
      User.update({
          name: req.body.name
        }, {
          $inc: {
            K: -(+req.body.K)
          }
        },
        (e, user) => {
          if (e) console.log(e)
        })
      Country.update({
          country: req.body.country
        }, {
          $inc: {
            K: -(+req.body.K)
          }
        },
        (e, user) => {
          if (e) console.log(e)
        })
    }

    function updateR() {
      User.update({
          name: req.body.name
        },
        resourceUpdate,
        (e, user) => {
          if (e) console.log(e)
        })
      Country.update({
          country: req.body.country
        },
        resourceUpdate,
        (e, user) => {
          if (e) console.log(e)
        })
    }
  })
  app.post('/buy_land', (req, res) => {
    var resourceUpdate = {
      $inc: {}
    }
    resourceUpdate.$inc[req.body.fire] = -(req.body.fire)
    resourceUpdate.$inc[req.body.water] = -(req.body.water)
    resourceUpdate.$inc[req.body.wood] = -(req.body.wood)
    resourceUpdate.$inc[req.body.stone] = -(req.body.stone)
    resourceUpdate.$inc[req.body.seed] = -(req.body.seed)
    buyLand()
    async function buyLand() {
      await updateC()
      await updateM()
      res.send({
        data: true
      })
    }

    function updateC() {
      Country.update({
          country: req.body.country
        }, {
          $inc: {
            fire: -(+req.body.fire),
            water: -(+req.body.water),
            wood: -(+req.body.wood),
            stone: -(+req.body.stone),
            seed: -(+req.body.seed)
          }
        },
        (e, user) => {
          if (e) console.log(e)
        })
    }

    function updateM() {
      Map.update({
          map_name: req.body.mapName
        }, {
          $set: {
            country: req.body.country
          }
        },
        (e, user) => {
          if (e) console.log(e)
        })
    }
  })
  app.post('/scan_qrcode', (req, res) => {
    var resourceUpdate = {
      $set: {}
    }
    resourceUpdate.$set[req.body.qrcodeName] = 'T'
    scanQRcode()
    async function scanQRcode() {
      User.find({
        name: req.body.name
      }, async(e, user) => {
        if (e) {
          console.log(e)
        } else {
          if (user[0][req.body.qrcodeName] === 'F') {
            const B = {}
            B.B1 = user[0].B1
            B.B2 = user[0].B2
            B.B3 = user[0].B3
            B.B4 = user[0].B4
            B.B5 = user[0].B5
            B.B6 = user[0].B6
            await updateC(user[0].B2, user[0].B3, user[0].B4, user[0].B5, user[0].B6)
            await updateM()
            res.send({
              data: true,
              B
            })
            res.end()
          } else {
            res.send({
              data: false
            })
            res.end()
          }
        }
      })
    }

    function updateC(B2, B3, B4, B5, B6) {
      Country.update({
          country: req.body.country
        }, {
          $inc: {
            fire: req.body.fire * B2,
            water: req.body.water * B3,
            wood: req.body.wood * B4,
            stone: req.body.stone * B5,
            seed: req.body.seed * B6
          }
        },
        (e, user) => {
          if (e) console.log(e)
        })
    }

    function updateM() {
      User.update({
          name: req.body.name
        },
        resourceUpdate,
        (e, user) => {
          if (e) console.log(e)
        })
    }
  })

  app.post('/buy_hint', (req, res) => {
    var puzzleUpdate = {
      $set: {}
    }
    puzzleUpdate.$set[req.body.puzzle] = req.body.puzzle_result
    buyHint()
    async function buyHint() {
      User.find({
        name: req.body.name
      }, async(e, user) => {
        if (e) {
          console.log(e)
        } else {
          if (user[0].K >= 25 && user[0].country === 'M') {
            await updateK()
            await updateP()
            await record()
            res.send({
              data: true
            })
            res.end()
          } else if (user[0].K >= 30 && user[0].country !== 'M') {
            await updateK()
            await updateP()
            await record()
            res.send({
              data: true
            })
            res.end()
          } else {
            res.send({
              data: false
            })
            res.end()
          }
        }
      })
    }

    function updateK() {
      User.update({
          name: req.body.name
        }, {
          $inc: {
            K: -(+req.body.cost)
          }
        },
        (e, user) => {
          if (e) console.log(e)
        })
      Country.update({
          country: req.body.country
        }, {
          $inc: {
            K: -(+req.body.cost)
          }
        },
        (e, user) => {
          if (e) console.log(e)
        })
    }

    function updateP() {
      User.update({
          name: req.body.name
        },
        puzzleUpdate,
        (e, user) => {
          if (e) console.log(e)
        })
    }

    function record() {
      Setting.update({}, {
        $push: {
          day1_puzzle: '時間為：' + moment().tz('Asia/Taipei').format('llll') + ' /組別：' + req.body.name + ' /' + req.body.puzzle + ':' + req.body.puzzle_result
        }
      }, function (e, data) {
        // console.log(data)
      })
    }
  })
  app.post('/update_user_resource', (req, res) => {
    User.update({
      name: req.body.name
    }, {
      $inc: {
        K: req.body.K,
        water: req.body.water,
        fire: req.body.fire,
        wood: req.body.wood,
        stone: req.body.stone,
        seed: req.body.seed
      }
    }, (e, user) => {
      if (e) {
        console.log(e)
      } else {
        res.end()
      }
    })
    Country.update({
      country: req.body.country
    }, {
      $inc: {
        K: req.body.K,
        water: req.body.water,
        fire: req.body.fire,
        wood: req.body.wood,
        stone: req.body.stone,
        seed: req.body.seed
      }
    }, (e, user) => {
      if (e) {
        console.log(e)
      } else {
        res.end()
      }
    })
    Setting.update({}, {
      $push: {
        day1_resource: '時間為：' + moment().tz('Asia/Taipei').format('llll') + ' /組別：' + req.body.name + ' /K寶石:' + req.body.K + ' /水：' + req.body.water + ' /火：' + req.body.fire + ' /木頭：' + req.body.wood + ' /石頭：' + req.body.stone + ' /種子：' + req.body.seed
      }
    }, function (e, data) {
      console.log(data)
    })
  })
  app.post('/switchs_table', (req, res) => {
    Setting.update({}, {
      $set: {
        changeToDay3: req.body.state
      }
    }, (e, user) => {
      if (e) {
        console.log(e)
      } else {
        res.end()
      }
    })
  })
  app.post('/reset_qrcode', (req, res) => {
    User.update({}, {
        $set: {
          R1: 'F',
          R2: 'F',
          R3: 'F',
          R4: 'F',
          R5: 'F',
          R6: 'F',
          R7: 'F',
          R8: 'F',
          R9: 'F',
          R10: 'F'
        }
      }, {
        'multi': true
      },
      (e, user) => {
        if (e) {
          console.log(e)
        } else {
          res.end()
        }
      })
  })
  app.post('/update_reference', (req, res) => {
    Setting.update({}, {
      $set: {
        reference: req.body.reference
      }
    }, (e, user) => {
      if (e) {
        console.log(e)
      } else {
        res.end()
      }
    })
  })
  // app.post('/update_board', (req, res) => {
  //   console.log(io)
  //   // io.emit('notification', {data: req.body.board})
  //   Setting.update(
  //     {},
  //     {
  //     $set: {
  //       board: req.body.board
  //     }
  //   }, (e, user) => {
  //     if (e) {
  //       console.log(e)
  //     } else {
  //       res.end()
  //     }
  //   })
  // })
  // 注册
  app.post('/user/signup', (req, res) => {
    var _user = req.body
    console.log(_user)
    User.findOne({
      name: _user.name
    }, (err, user) => {
      if (err) {
        console.log(err)
      }
      if (user) {
        res.json({
          errno: 1,
          data: '用户名已存在'
        })
      } else {
        new User(_user).save((err, user) => {
          if (err) {
            console.log(err)
          }
          res.json({
            errno: 0,
            data: '注册成功'
          })
        })
      }
    })
  })
  // 登录
  app.post('/user/signin', (req, res) => {
    console.log(req.body)
    var _user = req.body
    var name = _user.name
    var password = _user.password
    console.log(password)
    User.findOne({
      name: name
    }, (err, user) => {
      if (err) {
        console.log(err)
      }
      console.log(user)
      if (!user) {
        res.json({
          errno: 1,
          data: '用户不存在'
        })
      } else {
        if (password) {
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              console.log(err)
            }
            if (isMatch) {
              req.session.user = user
              console.log('success')
              res.json({
                errno: 0,
                data: '登录成功',
                name: name,
                src: user.src
              })
            } else {
              res.json({
                errno: 1,
                data: '密码不正确'
              })
              console.log('password is not meached')
            }
          })
        } else {
          res.json({
            errno: 1,
            data: '登录失败'
          })
        }
      }
    })
  })
  // 信息
  app.get('/message', (req, res) => {
    Message.find({}, (err, message) => {
      if (err) {
        console.log(err)
      } else {
        res.json({
          errno: 0,
          data: message
        })
      }
    })
  })
  // 机器人消息
  app.post('/robotapi', (req, res) => {
    var response = res
    var info = opents.convertSync(req.body.info)
    var userid = req.body.id
    var key = 'fde7f8d0b3c9471cbf787ea0fb0ca043'
    superagent.post('http://www.tuling123.com/openapi/api')
      .send({
        info,
        userid,
        key
      })
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        response.send({
          data: {
            text: openst.convertSync(JSON.parse(res.text).text),
            code: JSON.parse(res.text).code,
            url: JSON.parse(res.text).url,
          }
        })
        response.end()
      })
  })
}