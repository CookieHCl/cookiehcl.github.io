---
title: Hexo permalink 숫자로 나오게 하기
categories:
  - BLOG
abbrlink: 3
date: 2023-12-08 14:10:06
tags:
---

# 문제점

분명 Hexo에는 이걸 지원하는 [plugin](https://github.com/rozbo/hexo-abbrlink2)이 있고, 이것 때문에 Hexo로 블로그 만들기를 시작했는데, 정작 이 plugin이 작동하질 않았다...

아직 Hexo 작동원리를 정확히 아는 것은 아니라 모르겠지만, 대충 이유를 추측하자면 저 plugin은 [post_permalink](https://hexo.io/api/filter_post-permalink) filter에서 주소를 계산하는데, 게시글 주소가 여러 곳에서 쓰이다 보니 (메인화면, 이전/다음 글, 카테고리 등...) post_permalink filter가 여러 번 불린다.

근데 plugin 제작자가 이럴거라고 생각을 못 했는지, 아니면 post_permalink가 불릴때마다 순서가 뒤죽박죽이라던지, 여러가지 이유로 게시글 주소를 계산할 때마다 permalink를 다르게 계산하고, 결국 링크가 제대로 작동하지 않는 문제가 생겼다.

# 해결책

결국 plugin을 직접 만들기로 했다... 아래 파일을 `scripts/abbrlink.js`로 저장한다.

``` js
let abbrlinks = {};

hexo.extend.filter.register('before_generate', () => {
    const posts = hexo.locals.get('posts').data;
    let undefined_posts = [];
    let max_abbrlink = 0;

    // get max abbrlink
    for (const post of posts) {
        if (post.abbrlink) {
            abbrlinks[post._id] = post.abbrlink;
            max_abbrlink = Math.max(max_abbrlink, post.abbrlink);
        }
        else {
            undefined_posts.push(post);
        }
    }

    // generate abbrlink for undefined posts
    undefined_posts.sort((a, b) => a.date - b.date);
    for (const post of undefined_posts) {
        abbrlinks[post._id] = ++max_abbrlink;
    }
});

hexo.extend.filter.register('post_permalink', (data) => {
    // if abbrlink is already set, do nothing
    if (data.abbrlink) {
        return data;
    }

    // set abbrlink if abbrlink is generated
    const abbrlink = abbrlinks[data._id];
    if (abbrlink) {
        data.abbrlink = abbrlink;
    }

    return data;
}, 1);
```

항상 게시글 주소가 똑같이 유지되도록 [before_generate](https://hexo.io/api/filter#before-generate) filter에서 미리 주소를 전부 계산한 다음, post_permalink filter에서는 그냥 계산한 주소를 붙이기만 하기로 했다.

계산한 숫자 주소는 원본 plugin에서 쓰던 대로 **abbrlink**라고 부르기로 했다.

웃기게도 가장 애먹은 부분은 모든 게시글을 불러오려면 `const posts = hexo.locals.get('posts').data;`를 써야 된다는 것을 알아내는 일이였다... 제발 documentation 똑바로 좀 만들어라...

이후는 abbrlink가 없는 post들을 찾은 다음, 날짜 순으로 정렬해 쓴 순더대로 abbrlink를 붙여주는게 끝이다.
