const async = require('async')
const agent = require('superagent')
const cheerio = require('cheerio')
const moment = require('moment')
const request = require('request')
const notifier = require('node-notifier')
const query = require('../mysql')
const {songConfig} = require('../config')
const fetch = require('node-fetch')

const getPageS = () => {
    fetch('http://specialsearch.kugou.com/special_search?keyword=%E5%B0%91%E5%84%BF%E6%AD%8C%E6%9B%B2&page=1&pagesize=30').then(res => {
        return res.json()
    }).then(res => {
        console.log(res)
        res.data.lists.map((item, index) => {
            // console.log(item)
            const specialid = item.specialid
            console.log('specialid:', specialid)
            songCollect(specialid)
        })
    })
}

const songCollect = (id) => {
    agent.get(`http://www.kugou.com/yy/special/single/${id}.html`)
    .then(res => {
        const $ = cheerio.load(res.text)
        const elms = $('#songs ul li')
        elms.map((index, item) => {
            const id = item.children[0].attribs.data.split('|')[0]
            console.log("id:", id)
            findUrlAndImg(id)
        })
    })
}

function findUrlAndImg(id) {
    const url = `http://www.kugou.com/yy/index.php?r=play/getdata&hash=${id}`
    fetch(url).then(res => {return res.json()}).then(res => {
        const singer = res.data.author_name
        const name = res.data.song_name
        const img = res.data.img
        const url = res.data.play_url
        const lyrics = res.data.lyrics
        query('insert into song SET song=?, singer=?, image=?, url=?, liyics=?',  [name, singer, img, url, lyrics], function(err, res) {
            if(err) {return console.log(err)}
            console.log('插入数据库成功', res)
        })
    })
}

getPageS()
