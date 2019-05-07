# macup-dist

This is a macup distribution. It is meant to run with bash after a clean install of mac, to automate setup of your mac.

## Set up
1. Run `npm install` to get all the build dependencies
2. Run `npm run build` to test the script
3. Create an access token to github, so that your cleaned mac can access this repo without logging in with your credentials. See [GitHubs documentation](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)

## Usage (clean install)
If you've set up this repo correctly, all you need to do on your new mac is to run the following command in your terminal

```bash
curl -s -H "Authorization: token YOUR_GITHUB_USER_TOKEN" -L https://api.github.com/repos/eeerlend/THIS_REPO/tarball > macup-master.tar && ([ ! -d macup-master ] && mkdir macup-master); tar xfz macup-master.tar -C ./macup-master --strip-components=1 && rm macup-master.tar && cd macup-master && bash macup.sh
```

Voila!
