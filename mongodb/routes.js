/*
* routes.js -- module to provide routing
* */

'use strict'

const mongodb = require('mongodb')

const fsHandle = require('fs')

const server = new mongodb.Server('localhost', 27017)

const db = new mongodb.Db('spa', server)

const makeMongoId = mongodb.ObjectID // 方便操作

const objTypeMap = { 'user': {} }

/* 在路由中加载schema */
// -------- begin utility methods --------
const loadSchema = function (schema_name, schema_path) {
  fsHandle.readFile(schema_path, 'utf8', function (err, data) {
    objTypeMap[schema_name] = JSON.parse(data)
  })
}

// -------- end utility methods --------

const configRoutes = (app, server) => {
  app.get('/', (req, res) => {
    res.redirect('/spa.html')
  })

  app.all('/:obj_type/*?', (req, res, next) => {
    res.contentType('json')
    // 如果对象类型（:obj_type）在对象类型映射中没有定义，则发送一个JSON 响应，告诉客户端是一个无效的路由。
    if (objTypeMap[req.params.obj_type]) {
      next()
    } else {
      res.send({
        error_msg: req.params.obj_type + ' is not a valid object type.'
      })
    }
    // next()
  })

  app.get('/:obj_type/list', (req, res) => {
    db.collection(
      req.params.obj_type,
      function (outer_error, collection) {
          collection.find().toArray(
            (inner_error, map_list) => {
              let data = {
                code: '0000',
                msg: 'hello world',
                data: map_list,
                success: true
              }
              res.send(data)
            }
          )
      }
    )
  })

  app.post('/:obj_type/create', (req, res) => {
    db.collection(
      req.params.obj_type,
      function (outer_error, collection) {
        let obj_map = req.body
        collection.insert(
          obj_map,
          options.map,
          (inner_error, result_map) => {
            res.send(result_map)
          }
        )
      }
    )
  })

  app.get('/:obj_type/read/:id', (req, res) => {
    let find_map = { _id: makeMongoId(req.params.id) }
    db.collection(
      req.params.obj_type,
      function (outer_error, collection) { // findOne 方法，查找并返回匹配搜索参数的第一个文档
        collection.findOne(
          find_map,
          (inner_error, result_map) => {
            res.send(result_map)
          }
        )
      }
    )
  })

  app.post('/:obj_type/update/:id', (req, res) => {
    let find_map = { _id: makeMongoId(req.params.id) }
    let obj_map = req.body
    db.collection(
      req.params.obj_type,
      function (outer_error, collection) {
        let sort_order = []
        let option_map = {
          'new': true, upsert: false
        }
        collection.findAndModify(
          find_map,
          sort_order,
          obj_map,
          option_map,
          (inner_error, updated_map) => {
            res.send(updated_map)
          }
        )
      }
  )
  })

  app.get('/:obj_type/delete/:id', (req, res) => {
    let find_map = { _id: makeMongoId(req.params.id) }
    db.collection(
      req.params.obj_type,
      function (outer_error, collection) { // 使用remove 方法移除所有匹配对象映射属性的文档。传入single: true 选项，这样最多就只会删除一个文档。
        let options_map = { single: true }
        collection.remove(
          find_map,
          options_map,
          (inner_error, delete_count) => {
            let config = {
              code: '0000',
              data: null,
              msg: delete_count.n === 1 ? '删除成功' : '删除数据为空',
              success: delete_count.ok === 1 && delete_count.n === 1
            }
            res.send({ delete_count: config })
          }
        )
      }
    )
  })
}

module.exports = { configRoutes: configRoutes }

// -------- begin module initialization ---------
db.open(() => {
  console.log(`** Connected to MongoDB **`)
})

// -------- end module initialization ---------s
const func = function () {
  var schema_name, schema_path
  for (schema_name in objTypeMap) {
    if (objTypeMap.hasOwnProperty(schema_name)) {
      schema_path = __dirname + '/' + schema_name + '.json'
      loadSchema(schema_name, schema_path)
    }
  }
}

func()
