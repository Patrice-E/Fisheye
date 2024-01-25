function mediaTemplate(namePhotographer, media, Likes, medias) {
  const { id, title, likes } = media;

  let mediaContent;
  const srcMedia = `./src/assets/photographers/${namePhotographer}`;
  if (media.image) {
    mediaContent = document.createElement('img');
    mediaContent.setAttribute('src', `${srcMedia}/${media.image}`);
  }
  if (media.video) {
    mediaContent = document.createElement('video');
    mediaContent.setAttribute('src', `${srcMedia}/${media.video}`);
  }
  mediaContent.setAttribute('alt', title);

  const lb = document.querySelector('.lightbox');
  function getMediaCardDOM() {
    const article = document.createElement('article');
    const fig = document.createElement('figure');
    const link = document.createElement('a');
    link.setAttribute('href', '"#"');
    link.appendChild(mediaContent);
    link.onclick = (event) => {
      event.preventDefault();
      openLightBox(media, medias, namePhotographer);
    };
    fig.appendChild(link);
    const infos = document.createElement('figcaption');
    infos.className = 'media-infos';
    const name = document.createElement('p');
    name.textContent = title;
    const nbLikes = document.createElement('span');
    nbLikes.textContent = likes;
    const togglelike = document.createElement('div');
    togglelike.className = 'togglelike';
    const checkLikes = document.createElement('input');
    checkLikes.setAttribute('type', 'checkbox');
    checkLikes.setAttribute('id', id);
    checkLikes.className = 'hidden';
    const label = document.createElement('label');
    label.setAttribute('for', id);
    const emptyLike = document.createElement('img');
    emptyLike.setAttribute('src', './src/assets/icons/pinklike.svg');
    emptyLike.className = 'empty';
    const fullLike = document.createElement('img');
    fullLike.setAttribute('src', './src/assets/icons/brownlike.svg');
    fullLike.className = 'full';
    label.appendChild(emptyLike);
    label.appendChild(fullLike);
    checkLikes.addEventListener('change', function () {
      if (checkLikes.checked) {
        nbLikes.textContent = likes + 1;
        Likes.fire('INC');
      } else {
        nbLikes.textContent = likes;
        Likes.fire('DEC');
      }
    });
    togglelike.appendChild(checkLikes);
    togglelike.appendChild(label);
    const divLikes = document.createElement('div');
    divLikes.className = 'nblikes';
    divLikes.appendChild(nbLikes);
    divLikes.appendChild(togglelike);
    infos.appendChild(name);
    infos.appendChild(divLikes);
    fig.appendChild(infos);
    // Apport des informations dans l'article
    article.appendChild(fig);
    return article;
  }

  return { getMediaCardDOM };
}

export { mediaTemplate };
