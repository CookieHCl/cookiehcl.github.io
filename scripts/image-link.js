const imageLink = function (args) {
  const [title, link, content, image] = args.join(' ').split('|').map(arg => arg.trim());
  const hasExtension = /\.[^/]+$/.test(image);
  return `<div class="image-link-container">
    <object class="image-link-image" ${hasExtension ? '' : 'type="image/jpeg" '}data="${image}"></object>
    <p>${title}</p><p>${content}</p>
    <a href="${link}"></a>
  </div>`;
};

hexo.extend.tag.register('imagelink', imageLink);
hexo.extend.tag.register('il', imageLink);
