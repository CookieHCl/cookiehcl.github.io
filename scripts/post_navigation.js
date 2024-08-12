let post_navigations = {
  __posts: [],
  __path: '/'
};

let post_ids = {};

// https://github.com/hexojs/hexo/issues/5287
// WTF

hexo.extend.filter.register('before_generate', () => {
  // sort posts by date in ascending order
  const posts = hexo.locals.get('posts').data.sort((a, b) => a.date - b.date);

  console.log(`YO Any Posts?`);
  // get post navigations
  for (const post of posts) {
    console.log(`YO ${post.title}`);
    post_ids[post._id] = {
      path: post.path,
      title: post.title
    };

    const dirs = post.source.split('/').slice(1);
    let path = '/';
    let curr_navigation = post_navigations;

    for (const dir of dirs) {
      curr_navigation.__posts.push(post._id);

      path += dir + '/';
      if (!curr_navigation[dir]) {
        curr_navigation[dir] = {
          __posts: [],
          __path: path
        };
      }
      curr_navigation = curr_navigation[dir];
    }
  }
}, 1); // update this ASAP

hexo.extend.filter.register('before_post_render', (data) => {
  // if data isn't post, do nothing
  if (data.layout !== 'post') {
    return data;
  }
  // if navigation is already set, do nothing
  if (data.navigations) {
    return data;
  }

  let navigations = [];

  // calculate navigations
  const dirs = data.source.split('/').slice(1);
  let curr_navigation = post_navigations;

  for (const dir of dirs) {
    const idx = curr_navigation.__posts.indexOf(data._id);
    navigations.push({
      path: curr_navigation.__path,

      // prev or next will be undefined if it doesn't exist
      prev: curr_navigation.__posts[idx - 1],
      next: curr_navigation.__posts[idx + 1]
    });

    curr_navigation = curr_navigation[dir];
  }

  //remove unnecessary navigations
  data.navigations = navigations.reduce((filtered, navigation, idx, original) => {
    // if navigation is both undefined, i.e. there is only one post in the directory
    if (typeof navigation.prev === 'undefined' && typeof navigation.next === 'undefined') {
      return filtered;
    }

    // if navigation is the same as the next navigation, i.e. this directory has no posts
    /*let next_navigation = original[idx + 1];
    if (next_navigation?.prev === navigation.prev && next_navigation?.next === navigation.next) {
      return filtered;
    }*/

    // instead of ids, use the actual post info
    filtered.push({
      path: navigation.path,
      prev: post_ids[navigation.prev],
      next: post_ids[navigation.next]
    });
    return filtered;
  }, []);

  return data;
});
