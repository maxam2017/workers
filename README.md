<p align="center">
  <img src="https://i.imgur.com/1jj07Nvl.png" alt="worker logo" width="300">
</p>
<p align="center">
  <img src="https://img.shields.io/badge/language-typescript-blue?style=flat-square"/>
  <img src="https://img.shields.io/github/license/maxam2017/workers?style=flat-square"/>
</p>


---

## Overview
a repo for all interesting workers.

## Setup
```bash
npm i @cloudflare/wrangler -g
yarn install
lerna bootstrap
```

## FAQ
1. How to create a new worker

```bash
npm i @cloudflare/wrangler -g
yarn generate <package-name>
```

2. Where is global wrangle config?
```bash
$HOME/.wrangler/config/default.toml
```

## Reference
https://developers.cloudflare.com/workers/tutorials/manage-projects-with-lerna
