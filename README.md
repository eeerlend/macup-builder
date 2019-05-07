# macup-builder

This module sets up your own macup instance.

## Installation
1. Run the following command in a new folder

```bash
npx eeerlend/macup-builder setup
```

This will create some basic files for you.

2. Now, run `npm install` to get all dependencies, and to run post installation scripts

3. Configure `./dist/my.config` to your needs, and build the package with the following command:

```bash
npm run build`
```

## Official modules
You can extend macup, either with official modules, or with your own.

- [eeerlend/macup-core](https://github.com/eeerlend/macup-core)
- [eeerlend/macup-command-line-tools](https://github.com/eeerlend/macup-command-line-tools)
- [eeerlend/macup-dotfiles-icloud](https://github.com/eeerlend/macup-dotfiles-icloud)
