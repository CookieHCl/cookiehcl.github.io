let abbrlinks = {};

hexo.extend.filter.register('before_generate', () => {
    let posts = hexo.model('Post')
    let undefined_posts = []
    let max_abbrlink = 0

    posts.forEach(post => {
        if (post.abbrlink) {
            abbrlinks[post._id] = post.abbrlink;
            max_abbrlink = Math.max(max_abbrlink, post.abbrlink);
        }
        else {
            undefined_posts.push(post)
        }
    });

    undefined_posts.sort((a, b) => {
        return a.date - b.date;
    });
    undefined_posts.forEach(post => {
        abbrlinks[post._id] = ++max_abbrlink;
    });
});

hexo.extend.filter.register('post_permalink', (data) => {
    if (!data.abbrlink) {
        data.abbrlink = abbrlinks[data._id]
    }
    return data;
}, 1);
