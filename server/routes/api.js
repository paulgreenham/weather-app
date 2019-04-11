const express = require('express')
const request = require('request')
const router = express.Router()

const apixuKey = "2821da6017074d5998b81616191104"

const City = require('../models/City')

router.get('/city/:city', function (req, res) {
    request(`http://api.apixu.com/v1/current.json?key=${apixuKey}&q=${req.params.city}`, function (err, response, body) {
        let data = JSON.parse(body)
        res.send(data)
    })
})

module.exports = router