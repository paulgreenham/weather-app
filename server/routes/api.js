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
        updatedAt: moment(data.updatedAt).format(),
        temperature: data.temperature,
        condition: data.condition,
        conditionPic: data.conditionPic
    })
    newCity.save()
    res.end(console.log(`Added ${newCity.name}`))
})

router.delete('/city/:cityName', async function (req, res) {
    let city = req.params.cityName
    let response = await City.deleteOne({name: city})
    res.end(console.log(`Deleted ${response.deletedCount} instance(s) of ${city}`))
})

module.exports = router