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
