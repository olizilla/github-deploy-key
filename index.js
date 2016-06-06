const pkg = require('./package.json')
const conf = require('rc')(pkg.name)
const async = require('async')
const createKeypair = require('./create-keypair')

// github-deploy-key add tableflip/whizzbang -user oli
// { _: [ 'add', 'tableflip/whizz' ], token: 'sdfkjsaldalsdkjaslkdjasl' }

if (!conf.token) return fail ('please provide a github token [--token rando]')

const addToGithub = require('./add-to-github')(conf.token)

if (conf._[0] === 'add') {
  const repos = conf._.slice(1)
  async.map(repos, createKeypair, (err, res) => {
    if (err) return fail(err)
    async.map(res, addToGithub, (err, res) => {
      if (err) return fail(err)
      res.forEach(() => {
        console.log('Public key added to:', res.repo)
        console.log('Private key for:', res.repo)
        console.log(res.kepair.priv)
        console.log()
      })
    })
  })
}

function fail (msg) {
  console.error(msg)
  process.exit(-1)
}
