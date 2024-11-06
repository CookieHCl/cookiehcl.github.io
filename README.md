# Github Pages

[Hexo](https://hexo.io/) 사용

<https://cookiehcl.github.io>

## How to build

``` bash
npm install -g hexo-cli
npm install
hexo clean
hexo generate -w
hexo server
```

## Vscode Tasks

- Create new post: post 경로와 제목을 입력하면 post 만든 후 엶
- Run blog: Generate blog, Start blog, Open blog가 합쳐진 Task  
    watch 모드로 generate 후 browser-sync로 서버를 연 뒤 VSCode의 Simple Browser에서 블로그를 엶

## Commit Rule

- [HEXO] HEXO 관련 커밋
- [REPO] REPO 관련 커밋
- [BLOG] BLOG 관련 커밋 글 작성, 수정, 삭제 등등

블로그 글들은 날짜-이름 형식임. `yymmdd-my_post.md`
