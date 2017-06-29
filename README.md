# github-deploy-key

**A cli to generate and add SSH [deploy keys](https://developer.github.com/guides/managing-deploy-keys/#deploy-keys) to private repos**

Saves you from having to remember the ssh-keygen args and then fumble around on github like an animal 🐯

[`npm install -g github-deploy-key`](https://www.npmjs.com/package/github-deploy-key)

## Usage

```sh
github-deploy-key add [repo] --token <rando>

#e.g.
github-deploy-key add olizilla/github-deploy-key --token deadbeef
```

Where:
- `[repo]` is 1 or more repos that you want to add ssh deploy keys to.
- `--token <rando>` is a github [access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/)

Running the above will create a new random [ssh keypair](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) and POST the **public key** to the [add deploy key](https://developer.github.com/v3/repos/keys/#add-a-new-deploy-key) github api, and mark it as `read_only: true` as that's best. This is a disposable deploy key after all, and has no business being used to change the repo. However, if you need to grant write access, you can use the flag `--grantWriteAccess` to set `read_only: false`. The default is `read_only: true`.

The **private key** will be logged out to the console, for you to add to your vault or deploy bots or whatever automagic you choose to set up. It's imbued with enough power to clone the private repo you just added it's public counterpart to, so keep it away from burglars and kids.

You can go check https://github.com/olizilla/github-deploy-key/settings/keys or the equivalent for your repo to see the public key was added.

The key-pair are also dumped in the current working directory like so:

```
./<repo>/<timestamp>/id_rsa{.pub}

# e.g
olizilla
└── github-deploy-key
    └── 1465248385267
        ├── id_rsa
        └── id_rsa.pub
```

It's probably best to burn them as soon as you've shuffled the private key onto the CI server that'll use it, but they're there for you convenience, to delete at your leisure.

This module uses [`rc`](https://www.npmjs.com/package/rc) so you can save yourself a copy paste by storing your github http access token to any config file it supports, like

- `$HOME/.${appname}rc`
- `/etc/${appname}rc`

Though again, it's then on you to keep that file safe from burglars and the deranged.

---

A [(╯°□°）╯︵TABLEFLIP](https://tableflip.io) side project.
