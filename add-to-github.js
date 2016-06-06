const request = require('request')

module.exports = function (token) {
  const gh = request.defaults({
    baseUrl: 'https://api.github.com',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: 'token ' + token
    }
  })

  return function (data, cb) {
    console.log('gh', data)
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
