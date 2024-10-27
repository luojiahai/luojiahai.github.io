# [luojiahai.com](https://luojiahai.com/)

🛰️ It is the source of my site.

## Installation

Windows:
```shell
# installs fnm (Fast Node Manager)
winget install Schniz.fnm
# configure fnm environment
fnm env --use-on-cd | Out-String | Invoke-Expression
# download and install Node.js
fnm use --install-if-missing 20
# verifies the right Node.js version is in the environment
node -v
# verifies the right npm version is in the environment
npm -v
```

## Running

Windows:
```shell
# install dependencies
npm install
# run dev server locally
npm run docs:dev
```
