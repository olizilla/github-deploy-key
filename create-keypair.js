const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const exec = require('child_process').exec

module.exports = function create (repo, cb) {
  const type = 'rsa'
  const bits = '4096'
  const passphrase = '""'
  const comment = `"Deploy key for ${repo}"`
  const dir = [process.cwd(), repo, Date.now()].join('/')
  const filename = `${dir}/id_${type}`

  // create the output dir
  mkdirp(dir, (err) => {
    if (err) cb(err)

    // ssh-keygen -t rsa -b 4096 -f bar -N "" -C "Deploy key for tableflip/whizbang" -q
    const cmd = `ssh-keygen -t ${type} -b ${bits} -f ${filename} -N ${passphrase} -C ${comment} -q`
    console.log('cmd', cmd)

    exec(cmd, (err, stdout, stderr) => {
      if (err) cb(err)
      var keypair = {
        type: type,
        bits: bits,
        comment: comment,
        priv: fs.readFileSync(filename, {encoding: 'ascii'}),
        pub:fs.readFileSync(filename + '.pub', {encoding: 'ascii'})
      }
      cb(err, {repo, dir, filename, keypair})
    })
  })
}
