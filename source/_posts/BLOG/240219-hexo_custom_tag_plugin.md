---
title: Hexo tag plugin 만들기
categories:
  - BLOG
abbrlink: 10
date: 2024-02-19 07:50:19
tags:
---

# Tag Plugin이란?

Hexo에는 [Tag Plugin](https://hexo.io/docs/tag-plugins)이라는 개념이 있는데, Markdown으로 작성하지 못 하는 내용들을 작성할 때 사용한다. 쉽게 말하면 임의의 html 태그를 삽입할 수 있는 기능이다. Hexo에도 다양한 [Tag Plugin](https://hexo.io/docs/tag-plugins)들이 있지만, Next Theme에서도 버튼, 그래프 등 다양한 [Tag Plugin](https://theme-next.js.org/docs/tag-plugins)들을 제공한다.

# Tag Plugin 만들기

다행히도 Hexo에서 Tag Plugin 만드는 방법을 지원한다. `sciprts/` 폴더에 아래 두 코드 중 하나가 있는 파일을 저장하면 된다.

``` js
hexo.extend.tag.register('name', function(args){
  return `<div class="hello">hi</div>`;
});
```

이렇게 하면 게시글에 `{% name args %}`라고 쓰면 `<div class="hello">hi</div>`로 렌더링된다.

``` js
hexo.extend.tag.register('name', function(args, content){
  return `<div class="hello">${content}</div>`;
}, {ends: true});
```

이렇게 하면 게시글에

``` md
{% name args %}
content
{% endname %}
```

라고 쓰면 `<div class="hello">content</div>`로 렌더링된다.

# CSS 입히기

불행히도 이렇게 하면 원하는 html 태그를 넣을 수는 있지만 CSS가 없기 때문에 원하는 대로 꾸미지는 못 한다. 다행이도 Next Theme에서 [CSS를 삽입하는 방법](https://theme-next.js.org/docs/advanced-settings/custom-files)을 지원한다.

먼저 Next Config File인 `_config.next.yml`에 아래 설정을 추가한다.

``` yml
custom_file_path:
  style: source/_data/styles.styl
```

이후 `source/_data/styles.styl`에 [Stylus](https://stylus-lang.com/) 문법으로 원하는대로 스타일을 지정해주면 된다.
