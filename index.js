const pkg = require('./package.json')
const conf = require('rc')(pkg.name)
const async = require('async')
const createKeypair = require('./create-keypair')

// usage: github-deploy-key add tableflip/whizzbang -user oli
// { _: [ 'add', 'tableflip/whizz' ], token: 'sdfkjsaldalsdkjaslkdjasl' }

if (!conf.token) return fail ('please provide a github token [--token rando]')
const addToGithub = require('./add-to-github')(conf.token)

if (conf._[0] !== 'add') return fail ('Usage: $ github-deploy-key add tableflip/whizz --token rando')
const repos = conf._.slice(1)

if (!repos.length) return fail ('Usage: $ github-deploy-key add tableflip/whizz --token rando')

async.map(repos, createKeypair, (err, keys) => {
  if (err) return fail(err)
  async.map(keys, addToGithub, (err, keys) => {
    if (err) return fail(err)
    keys.forEach((res) => {
      console.log()
      console.log(res.keypair.priv)
      console.log(`Private key for: ${res.repo} 👆`)
      console.log(`Public key added to: https://github.com/${res.repo}/settings/keys`)
    })
  })
})

function fail (msg) {
  console.error(msg)
  process.exit(-1)
}
