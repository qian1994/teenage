const async = require('async')
const agent = require('superagent')
const cheerio = require('cheerio')
const moment = require('moment')
const request = require('request')
const notifier = require('node-notifier')
const query = require('../mysql')
const {songConfig} = require('../config')
const fetch = require('node-fetch')

const getSongs = (cb) => {
    query('select * from song limit 10', [], (err, res) => {
        if(err) {return console.log(err)}
        typeof cb == 'function' ? cb(res) : ''
    })
}


module.exports = getSongs
