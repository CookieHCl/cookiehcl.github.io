var Hexo = require('hexo');
var hexo = new Hexo(process.cwd(), {});

var front = require('hexo-front-matter');
var fs = require('hexo-fs');

hexo.init().then(() => {
  hexo.load().then(() => {
    const posts = hexo.locals.get('posts').data;
    let undefined_posts = [];
    let max_abbrlink = 0;
    let abbrlinks = {};

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

    // update posts
    for (const post of posts) {
      var tmpPost = front.parse(post.raw);
      tmpPost.abbrlink = abbrlinks[post._id];

      var newPost = '---\n' + front.stringify(tmpPost);
      fs.writeFile(post.full_source, newPost);
    }

    hexo.exit();
  });
});