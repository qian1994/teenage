const async = require('async')
const agent = require('superagent')
const cheerio = require('cheerio')
const request = require('request')
const notifier = require('node-notifier')
const {bookConfig} = require('../config')
const fetch = require('node-fetch')

const getPages = () => {
    for (let i = 2; i < 162; i++) {
        if (i !== 2) { return }
        const url = `http://www.gushi365.com/ertonggushi/index_${i}.html`;
        agent.get(url)
        .then(res => {
            const $ = cheerio.load(res.text)
            const elms = $('figure')
            elms.map((index, item) => {
                if(index !== 0) { return }
                const children = item.children
                console.log(children[0])
            })
        })
    }
}

getPages()
