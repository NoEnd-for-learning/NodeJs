/*
* routes.js -- module to provide routing
* */

'use strict'

const configRoutes = (app, server) => {
  app.get('/', (req, res) => {
    res.redirect('/spa.html')
  })

  app.all('/:obj_type/*?', (req, res, next) => {
    res.contentType('json')
    next()
  })

  app.get('/:obj_type/list', (req, res) => {
    res.send({ title: 'user list' })
  })

  app.post('/:obj_type/create', (req, res) => {
    res.send({ title: 'user created' })
  })

  app.get('/:obj_type/read/:id([0-9]+)', (req, res) => {
    res.send({
      title: `user with id ${req.params.id} found`
    })
  })

  app.get('/:obj_type/update/:id([0-9]+)', (req, res) => {
    res.send({
      title: `user with id ${req.params.id} updated`
    })
  })

  app.get('/:obj_type/delete/:id([0-9]+)', (req, res) => {
    res.send({
      title: `user with id ${req.params.id} deleted`
    })
  })
}

module.exports = { configRoutes: configRoutes }
