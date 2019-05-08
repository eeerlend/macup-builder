# macup-builder

macup is a node.js based framework for doing a single command bash-based installation on top of a macos installation.

The core principles are:

- With help of a single **configuration file**, prepare your macos installation
- With **one terminal command** (`bash macup.sh`), be able to install everything from scratch - ie. command line tools, git, even mac app store apps, user preferences, dotfiles etc.
- The setup should be **idempotent**, so it can be run multiple times
- Add whatever modules you would like to your own custom package. Either official ones, or your own.

## Preparations
1. First you need to prepare your package (Configuration is node.js based, but the package itself don't need node at all)

```bash
npx eeerlend/macup-builder setup
```

This will create a starting point for you, including a blank `/dist/my.config` file.

2. Now, run `npm install` to get dependencies (see list below for available official modules. Only `macup-core` is installed by default). Installation copies the `./dist` folder to your own project folder `./dist/packages/the-macup-module`.

3. Configure `./dist/my.config` to your needs (take a look at the different modules for configuration options).

4. Test your package form your project root;

```bash
bash macup.sh
```

5. Push your package to github (either public or private), and create a "personal access token" to be used when installing your macup package.

## Installation on mac client

1. On your newly installed mac, run the following command in your terminal (replace YOUR_AUTHORIZATION_TOKEN and YOUR_REPO with yout own data):

```bash
curl -s -H "Authorization: token {YOUR_AUTHORIZATION_TOKEN}" -L https://api.github.com/repos/{YOUR_REPO}/tarball > macup-master.tar && ([ ! -d macup-master ] && mkdir macup-master); tar xfz macup-master.tar -C ./macup-master --strip-components=1 && rm macup-master.tar && cd macup-master && bash macup.sh
```

Voila!

## Creating your own modules
Feel free to create and publish your own modules. To make it work with macup, the only thing needed is a `postinstall` hook in package.json, that does the following:

```json
"scripts": {
  "postinstall": "require('macup-builder/packageHandler').copyModule('YOUR_MODULE_NAME')"
}
```

... and, the bash file being executed during installation:

```
./dist/run.sh
```

## Official modules
You can extend macup, either with official modules, or with your own.

- [eeerlend/macup-clean-dock](https://github.com/eeerlend/macup-clean-dock)
- [eeerlend/macup-command-line-tools](https://github.com/eeerlend/macup-command-line-tools)
- [eeerlend/macup-core](https://github.com/eeerlend/macup-core)
- [eeerlend/macup-dotfiles-icloud](https://github.com/eeerlend/macup-dotfiles-icloud)
- [eeerlend/macup-homebrew](https://github.com/eeerlend/macup-homebrew)
- [eeerlend/macup-homebrew-casks](https://github.com/eeerlend/macup-homebrew-casks)
- [eeerlend/macup-mas](https://github.com/eeerlend/macup-mas)
- [eeerlend/macup-slimzsh](https://github.com/eeerlend/macup-slimzsh)
- [eeerlend/macup-terminal-colors](https://github.com/eeerlend/macup-terminal-colors)
- [eeerlend/macup-vscode-extensions](https://github.com/eeerlend/macup-vscode-extensions)
