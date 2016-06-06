const request = require('request')

module.exports = function (token) {
  const gh = request.defaults({
    json: true,
    baseUrl: 'https://api.github.com',
    headers: {
      'User-Agent': 'github-deploy-key',
      Accept: 'application/vnd.github.v3+json',
      Authorization: 'token ' + token
    }
  })

  return function (data, cb) {
    gh.post({
      url: `/repos/${data.repo}/keys`,
      body: {
        title: data.keypair.comment,
        key: data.keypair.pub,
        read_only: true
      }
    }, (err, res, body) => {
      if(err || res.statusCode > 299) return cb(err || body)
      data.response = body
      cb(err, data)
    })
  }
}
