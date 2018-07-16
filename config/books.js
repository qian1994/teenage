const bookConfig = {
    common: '',
    comment: '',
    len: 10,
    key: {},
    agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
}

bookConfig.req = {
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': bookConfig.agent
    },
    form: bookConfig.key
}

module.exports = bookConfig
