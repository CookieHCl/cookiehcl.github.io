---
title: 굳이굳이 Hexo로 블로그 시작한 이유
categories:
  - BLOG
date: 2023-11-30 13:34:03
tags:
---

# 동기

Github Pages랑 Markdown을 이용해서 블로그를 만들고 싶어서 시작했다.

처음에는 직접 html이랑 javascript를 배워서 만들어볼까 했지만, 맨땅에서 시작하기엔 웹프로그래밍에 대해 아는게 없었고, 블로그의 주 목적은 게시글을 작성하는 건데, html 단계부터 만들기 시작하면 내가 게시글을 만들 때마다 html을 새로 만들거나, 티스토리에 있는 것마냥 게시글 편집기를 직접 만들어야 할 것 같아서 포기했다.

결국 블로그의 주 목적은 ~~정확히는 블로그가 망하지 않으려면~~ 게시글을 작성하는 것이고, 이를 위해서는 게시글을 **쉽고 빠르게** 작성할 수 있어야 한다고 생각해서 Markdown 블로그를 만들었다.

물론 티스토리 블로그 같은 서비스를 이용해도 되지만, 혹시나 먼 미래에 갑자기 'html부터 새로 만들어보는 나만의 블로그' 같은 짓을 할 수도 있을 것 같아서 게시글들을 쉽게 이전할 수 있도록 Markdown으로 게시글을 작성했다.

# 그래서 왜 Hexo?

사실 가장 잘 알려진 방법은 [Jekyll](https://jekyllrb-ko.github.io/)을 사용하는 것이다. 일단 Github Pages에서 [공식적으로 권장하기도](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll) 하고, Markdown을 사용한 static site generator중에서는 가장 유명할 것이다.

하지만 굳이굳이 Hexo를 사용해서 블로그를 시작한 이유는 게시글 주소 때문인데, Jekyll은 주소로 게시글 제목, 날짜 등을 사용하지만 *(ex: blog&#46;com/2023/11/30/blog_sijak)* Hexo는 티스토리처럼 주소로 숫자를 사용하는 [플러그인](https://github.com/rozbo/hexo-abbrlink2)이 있었다. *(ex: blog&#46;com/123)*

막상 시작해보니 Hexo를 사용하게 된 계기인 주소 플러그인이 잘 작동하지 않는 문제점이 있긴 했지만, Hexo에서 지원하는 기능들이 상당히 많아서 Jekyll로 시작했으면 더 불편했을 것 같다.

## 장점

- 대부분 Hexo 유저가 사용하는 [Next Theme](https://theme-next.js.org/)이 정말 이쁘다!
- ruby를 사용하는 Jekyll과 달리, node.js를 사용해서 npm으로 쉽게 설치가 가능하다.
  - 솔직히 ruby는 아무도 안 쓰잖아...
- 중국인이 사용하기 때문에 다국어 지원이 잘 되어있어 겸사겸사 한국인도 이득을 봤다.
- Jekyll은 진짜 글만 모아둔 느낌인데 Hexo는 카테고리, 댓글, 글 검색 기능 등 일반적인 블로그 서비스들이 제공하는 기능들도 지원하려고 노력한다.
- syntax highlighting, LaTeX 지원이 기본으로 되어있다.
- 이외에도 유튜브 동영상, 그래프 등 Markdown으로 표현할 수 없는 부분을 지원하기 위한 플러그인들이 많다.
- 광고, 블로그 홍보에 미쳐있어서 블로그 홍보하는 documentation까지 있다.

## 단점

- 수상할 정도로 중국인들만 사용해서 그냥 귀찮게 영어 쓰는 대신 중국어로 issue, plugin 등을 남기는 경우가 많다. 심하면 그냥 README를 중국어로 적는 경우도 있다.
- Hexo도 광고에 미쳐있다. 무려 공식 documentation에 광고가 뜬다....
- Hexo의 기능이 뛰어나기 보단 [Next Theme](https://theme-next.js.org/)에서 지원하는 기능이 많아 테마가 제한되는 느낌이 있다.
  - Hexo plugin들도 Next Theme을 사용하는 가정 하에 만드는 경우도 있다.
  - 위 장점들 중에서도 Next Theme에만 해당되는 장점들도 있다.
  - 아마 다른 테마도 맞는 plugin들만 깔아주면 Next Theme과 같은 기능을 할 것 같긴 한데 다른 테마는 안 써봐서 모르겠다.
- 유저 수 적은 서비스가 늘 그렇듯이 API 등 심화된 부분으로 가면 documentation이 잘 안 되어있다. 덕분에 plugin 만들 때 좀 고생했다.

# 결론

그래서 Hexo를 써야 하냐고 묻는다면 쓰는게 좋은 것 같다. ~~본인처럼~~ 주는 것에 만족하지 못 하고 직접 건드리려고 하면 조금 애먹을 수 있지만 Next Theme이 워낙 잘 되어있어서 건드릴 일이 거의 없다.

Jekyll은 정말 기본적인 기능만 지원해서 카테고리, 검색 기능 같은 것을 지원하려면 어차피 plugin들을 찾아보거나, 직접 코딩하는 등 힘들게 살아야하는데 Hexo는 수많은 중국인들이 이미 귀찮은 작업들을 다 끝내줘서 찾아볼 필요가 없다. 감사합니다 따-거
