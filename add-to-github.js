const request = require('request')

module.exports = function (token) {
  const gh = request.defaults({'Authorization', 'token ' + token})
  return function (data, cb) {
    gh.post({
      url: `/repos/${data.repo}/keys`,
      body: {
        title: data.keypair.comment,
        key: data.keypair.pub,
        read_only: true
      }
    }, cb)
  }
}

module.exports = function (data, cb) {
  var repo = data.repo
  var pub = data.keypair.pub
  request.post
  cb(null, 'ok')
}