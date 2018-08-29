const route = require('express').Router()

route.use('/analyse', require('./analyse'))

exports = module.exports = {
    route
}
