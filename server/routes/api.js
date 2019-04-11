const express = require('express')
const request = require('request')
const moment = require('moment')
const router = express.Router()

const apixuKey = "2821da6017074d5998b81616191104"

const City = require('../models/City')

router.get('/city/:cityName', function (req, res) {
    request(`http://api.apixu.com/v1/current.json?key=${apixuKey}&q=${req.params.cityName}`, function (err, response, body) {
        let data = JSON.parse(body)
        res.send(data)
    })
})

router.get('/cities', async function (req, res) {
    let cities = await City.find({})
    res.send(cities)
})

router.post('/city', function (req, res) {
    let data = req.body
    let newCity = new City ({
        name: data.name,
        updatedAt: moment(data.updatedAt, "YYYY-MM-DD HH:mm").format("LLL"),
        temperature: data.temperature,
        condition: data.condition,
        conditionPic: data.conditionPic
    })
    newCity.save()
    res.end()
})

router.delete('/city/:cityName', function (req, res) {
    let city = req.params.cityName
    City.remove({name: city})
    res.end()
})

module.exports = router