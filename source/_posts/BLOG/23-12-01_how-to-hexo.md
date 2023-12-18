---
title: Hexo로 블로그 시작하기
categories:
  - BLOG
abbrlink: 2
date: 2023-12-01 23:24:06
tags:
---

# 설치

먼저 [node.js](https://nodejs.org/en/download/)와 [git](https://git-scm.com/downloads)을 깔아준다.

그 후 hexo를 설치한 다음 블로그 폴더를 만들어준다.

``` bash
npm install -g hexo-cli
hexo init <folder>
cd <folder>
npm install
```

# 실행

`hexo new --path <path> <title>`로 원하는 경로에 게시글을 만들 수 있다. 물론 Front matter만 알맞게 작성한다면 직접 Markdown 파일을 만들어도 상관없다.

게시글을 다 작성했다면 `hexo generate`로 블로그를 생성하고, `hexo server`로 블로그를 로컬 서버로 구동시킨다.  
`hexo generate -w`를 사용하면 파일이 편집될 때마다 블로그를 계속 생성해준다.

문제는 `hexo server`가 hot/live reloading을 지원하지 않아 블로그가 새로 생성돼도 브라우저를 새로고침 해야 반영이 된다.  
그래서 어쩔 수 없이 [Browsersync](https://browsersync.io/)를 깔아야 했는데, `npx browser-sync ./public -w`를 사용하면 파일이 편집될 때마다 새로 생성된 블로그를 볼 수 있다.

일부 변경사항은 `hexo generate`를 아무리 해도 적용이 안 되는데, (_config.yml 변경 등) 이때는 `hexo clean`으로 캐시를 지워줘야 한다.

# 배포

GitHub Pages니까 GitHub Actions을 사용하기로 했다.  
먼저 repository 설정에서 GitHub Pages를 활성화시켜야 한다.

- Code and automation - Pages에서 Source를 **Deploy from branch**로 해준다.
- Branch는 `gh-pages`로 선택한다.

이후 아래 파일을 `.github/workflows/pages.yml`으로 저장한다.

``` yaml
name: Deploy Github Pages

on:
  push:
    branches:
      - main

jobs:
  pages:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Setup LTS Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 'lts/*'

    - name: Cache NPM dependencies
      uses: actions/cache@v3
      with:
        path: node_modules
        key: npm-cache-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          npm-cache-${{ runner.os }}
          npm-cache

    - name: Build
      run: |
        npm install
        npx hexo generate

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
```

[actions/checkout](https://github.com/actions/checkout), [actions/setup-node](https://github.com/actions/setup-node)는 말 그대로의 일을 하고, [actions/cache](https://github.com/actions/cache)는 workflow가 빠르게 돌 수 있도록 `node_modules` 폴더를 캐싱해둔다.

그 후 `npx hexo generate`로 블로그를 생성한 다음 [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)로 `./public` 폴더를 GitHub Pages branch에 올리면 된다.

# NexT Theme 설치

NexT Theme 설치는 `npm install hexo-theme-next`로 간단하게 할 수 있다. 이후 `_config.yml`에서 `theme: next`로 설정해주면 된다.

그 후 NexT Theme 설정 파일을 따로 만들어줘야 하는데, `node_modules/hexo-theme-next/_config.yml`을 `_config.next.yml`로 복사해주고 `_config.next.yml`만 수정하면 된다.

# What's Next...?

이 이후로는 자유롭게 [hexo documentation](https://hexo.io/docs/configuration.html)과 [NexT documentation](https://theme-next.js.org/docs/theme-settings/)을 참고하면서 원하는 대로 수정하면 된다.

다른 [plugin](https://hexo.io/plugins/)들도 살펴보면서 필요한 것이 있다면 다운받아도 된다. 몇 가지 추천 플러그인들은 다음과 같다.

- [hexo-auto-category](https://github.com/xu-song/hexo-auto-category): post의 경로대로 category를 만들어준다.
- [hexo-excerpt](https://github.com/chekun/hexo-excerpt): 블로그 메인화면에서 post가 너무 길 경우 일부만 보여준다.
- [hexo-generator-searchdb](https://github.com/next-theme/hexo-generator-searchdb): 검색기능을 만들어준다! 자세한 설명은 [NexT documentation](https://theme-next.js.org/docs/third-party-services/search-services.html?highlight=searchdb#Local-Search)을 참고하자.
