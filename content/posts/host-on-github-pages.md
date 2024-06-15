+++
title = 'Host on GitHub Pages'
date = 2024-06-08T13:14:29+10:00
draft = false
author = 'luojiahai'
+++

## Prerequisites 

- Create a [GitHub](https://github.com/) account.
- Install [Git](https://www.git-scm.com/).
- Install [Hugo](https://gohugo.io/).

## Create a site

Verify that you have installed Hugo.
```
hugo version
```

Run these commands to create a Hugo site with the [Paper](https://github.com/nanxiaobei/hugo-paper) theme.
```
hugo new site <name>
cd <name>
git init
git submodule add https://github.com/nanxiaobei/hugo-paper.git themes/paper
echo "theme = 'paper'" >> hugo.toml
```

Test it locally with hugo server.
```
hugo server
```

## Add content

Add a new page to your site.
```
hugo new content posts/my-first-post.md
```

Add some Markdown to the body of the post.
```
+++
title = 'My First Post'
date = 2024-01-14T07:07:07+01:00
draft = true
+++

## Introduction

This is **bold** text, and this is *emphasized* text.

Visit the [Hugo](https://gohugo.io) website!
```

## Add GitHub Workflows

Create an empty file in your local repository.
```
.github/workflows/hugo.yaml
```

Copy and paste the YAML below into the file you created. Change the branch name and Hugo version as needed.
```
# Sample workflow for building and deploying a Hugo site to GitHub Pages
name: Deploy Hugo site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches:
      - main

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.126.0
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb          
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Build with Hugo
        env:
          # For maximum backward compatibility with Hugo modules
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
          TZ: America/Los_Angeles
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Publish the site

Create a GitHub repository.

Push your local repository to GitHub.

Visit your GitHub repository. From the main menu choose Settings > Pages.

Change the Source to GitHub Actions.

---
