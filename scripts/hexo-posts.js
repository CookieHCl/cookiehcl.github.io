// https://github.com/hexojs/hexo-fs
// https://github.com/hexojs/hexo-front-matter
// https://github.com/xu-song/hexo-auto-category/blob/master/lib/logic.js

// _posts 안에 있으면 다 post

/*
_Document {
  title: 'gagaga',
  date: Moment<2025-12-01T14:24:06+00:00>,
  _content: '\n푸하하\n',
  source: '_posts/vvv.md',
  raw: '---\ntitle: gagaga\ndate: 2025-12-01 23:24:06\n---\n\n푸하하\n',
  slug: 'vvv',
  published: true,
  updated: Moment<2025-12-01T14:24:06+00:00>,
  comments: true,
  layout: 'post',
  photos: [],
  _id: 'clz2rjnho0001948lcfik4kel',
  content: '<p>푸하하</p>\n',
  navigations: [ { path: '/', prev: [Object] } ],
  abbrlink: 3,
  length: 1,
  excerpt: '',
  more: '<p>푸하하</p>\n',
  path: [Getter],
  permalink: [Getter],
  full_source: [Getter],
  asset_dir: [Getter],
  tags: [Getter],
  categories: [Getter]
}
*/

var front = require('hexo-front-matter');
var fs = require('hexo-fs');

var posts = [];
/*
// Get all posts inside _posts directory
fs.listDirSync('source/_posts').forEach(function (file) {
  var content = fs.readFileSync('source/_posts/' + file);
  var post = front.parse(content);
  posts.push(post);
  console.log(post);
  console.log('----------------------');
});
*/