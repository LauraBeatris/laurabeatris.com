# laurabeatris.com

[![Author](https://img.shields.io/badge/author-LauraBeatris-000000?style=flat-square)](https://github.com/LauraBeatris)
[![Languages](https://img.shields.io/github/languages/count/LauraBeatris/laurabeatris.com?color=%23000000&style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/LauraBeatris/laurabeatris.com?color=000000&style=flat-square)](https://github.com/LauraBeatris/laurabeatris.com/stargazers)

---
# :pushpin: Table of Contents

* [Running Locally](#construction_worker-running-locally)
* [Issues](#bug-issues)
* [Contributing](#tada-contributing)

## :construction_worker: Running Locally

Disclaimer: This project fetches data from my personal [GraphCMS](https://graphcms.com/) workspace, thus it's necessary to define the CMS endpoint as a environment variable, otherwise it's not possible to fully execute the scripts bellow

#### Clone repository
```bash
git clone https://github.com/LauraBeatris/laurabeatris.com.git
```

#### Define environment variables
```bash
cp .env.local.example .env.local
```

#### Install dependencies & execute web application in development mode
```bash
yarn
yarn dev
```

Define the environment variables by creating a .env.local file similar to [.env.local.example](https://github.com/LauraBeatris/laurabeatris.com/blob/master/.env.local.example)
