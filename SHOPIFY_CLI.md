---
title: Shopify CLI
description: Shopify CLI is a command-line interface tool that helps you generate and work with Shopify apps, themes and custom storefronts. You can also use it to automate many common development tasks.
source_url:
  html: http://shopify.dev/docs/api/shopify-cli
  md: http://shopify.dev/docs/api/shopify-cli.txt
---

# Shopify CLI

Shopify CLI is a command-line interface tool that helps you generate and work with Shopify apps, themes and custom storefronts. You can also use it to automate many common development tasks.

## Requirements

* [Node.js](https://nodejs.org/en/download/): 20.10 or higher
* A Node.js package manager: [npm](https://www.npmjs.com/get-npm), [Yarn 1.x](https://classic.yarnpkg.com/lang/en/docs/install), or [pnpm](https://pnpm.io/installation).
* [Git](https://git-scm.com/downloads): 2.28.0 or higher

## Installation

This installs Shopify CLI globally on your system, so you can run `shopify` commands from any directory. Find out more about the available commands by running `shopify` in your terminal.

### examples

* ####

  ##### npm

  ```bash
  npm install -g @shopify/cli@latest
  ```

  ##### yarn

  ```bash
  yarn global add @shopify/cli@latest
  ```

  ##### pnpm

  ```bash
  pnpm install -g @shopify/cli@latest
  ```

  ##### homebrew

  ```bash
  # Only for macOS
  brew tap shopify/shopify
  brew install shopify-cli
  ```

## Commands

Shopify CLI groups commands into topics. The command syntax is: `shopify [topic] [command]`. Refer to each topic section in the sidebar for a list of available commands.

Or, run the `help` command to get this information right in your terminal.

### examples

* #### terminal

  #####

  ```bash
  shopify help
  ```

## Upgrade Shopify CLI

We recommend that you always use the latest version of Shopify CLI if possible. To upgrade, run `version` to check the current version and determine if there are any updates available. Run the [install](#installation) command to upgrade to the latest CLI version.

### examples

* #### terminal

  #####

  ```bash
  shopify version
  > Current Shopify CLI version: 3.50.0
  > 💡 Version 3.51.0 available!

  npm install -g @shopify/cli@latest
  ```

## Network proxy configuration

When working behind a network proxy, you can configure Shopify CLI (version 3.78+) to route connections through it:

1. Set the proxy for HTTP traffic:

   ```bash
   export SHOPIFY_HTTP_PROXY=http://proxy.com:8080
   ```

2. Optionally, set a different proxy for HTTPS traffic:

   ```bash
   export SHOPIFY_HTTPS_PROXY=https://secure-proxy.com:8443
   ```

   If not specified, the HTTP proxy will be used for all traffic.

3. For authenticated proxies, include credentials in the URL:

   ```bash
   export SHOPIFY_HTTP_PROXY=http://username:password@proxy.com:8080
   ```

## Usage reporting

Anonymous usage statistics are collected by default. To opt out, you can use the environment variable `SHOPIFY_CLI_NO_ANALYTICS=1`.

## Contribute to Shopify CLI

Shopify CLI is open source. [Learn how to contribute](https://github.com/Shopify/cli/wiki/Contributors:-Introduction) to our GitHub repository.

## Where to get help

* [Shopify Community Forums](https://community.shopify.com/) - Visit our forums to connect with the community and learn more about Shopify CLI development.
* [Open a GitHub issue](https://github.com/shopify/cli/issues) - To report bugs or request new features, open an issue in the Shopify CLI repository.

## Resources

[![](https://shopify.dev/images/icons/32/pickaxe-1.png)![](https://shopify.dev/images/icons/32/pickaxe-1-dark.png)](https://shopify.dev/docs/themes/getting-started/create)

[Start building a theme](https://shopify.dev/docs/themes/getting-started/create)

[Learn how to set up your theme development environment and create a new theme](https://shopify.dev/docs/themes/getting-started/create)

[![](https://shopify.dev/images/icons/32/tutorial.png)![](https://shopify.dev/images/icons/32/tutorial-dark.png)](https://shopify.dev/docs/apps/getting-started/create)

[Start building an app](https://shopify.dev/docs/apps/getting-started/create)

[Learn how to set up your app development environment and start building](https://shopify.dev/docs/apps/getting-started/create)