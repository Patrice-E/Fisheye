import { MediaFactory } from '../patterns/factories/MediaFactory.js';
import { LikesCounter } from '../patterns/observers/likes/Counter.js';
import { LikesSubject } from '../patterns/observers/likes/Subject.js';
import { mediaTemplate } from '../templates/media.js';

const currentFilter = document.querySelectorAll('.current-filter');
const changeFilter = document.querySelectorAll('.filter-change');

const getCurrentFilter = () => {
  const currentDisplay = document.querySelector('.current-filter');
  return currentDisplay.dataset.filter;
};

const changeCurrentFilter = (state) => {
  currentFilter.forEach((cf) => {
    cf.innerHTML = state;
    cf.dataset.filter = state;
  });
};

const toggleDisplayList = () => {
  const filterShowlist = document.querySelector('#filter_showlist');
  filterShowlist.classList.toggle('hidden');
};

const filterMedias = (photographer, medias, filter) => {
  switch (filter) {
    case 'Popularité':
      displayMedias(
        photographer,
        medias.sort((a, b) => b.likes - a.likes)
      );
      break;
    case 'Titre':
      displayMedias(
        photographer,
        medias.sort((a, b) => a.title.localeCompare(b.title))
      );
      break;
    case 'Date':
      displayMedias(
        photographer,
        medias.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      break;
  }
};

function useFilter(photographerName, photographerMedias, filter) {
  if (filter === undefined) {
    filter = 'Popularité';
  }
  changeCurrentFilter(filter);

  changeFilter.forEach((f) =>
    f.addEventListener('click', function () {
      const tmp = this.dataset.filter;
      this.dataset.filter = filter;
      this.innerHTML = filter;
      filter = tmp;
      changeCurrentFilter(filter);
      toggleDisplayList();
      filterMedias(photographerName, photographerMedias, filter);
    })
  );
}

async function displayMedias(photographer, medias) {
  const mediaSection = document.querySelector('.photograph-medias');
  mediaSection.innerHTML = '';
  const likes = document.querySelector('.likes-count');
  let totalLikes = 0;
  // Observer - Likes
  const LS = new LikesSubject();
  const LC = new LikesCounter();
  LS.subscribe(LC);

  medias.map((media) => {
    const m = new MediaFactory(media);
    totalLikes += media.likes;
    const mediaModel = mediaTemplate(photographer, m, LS, medias);
    const mediaCard = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCard);
  });

  LC._count = totalLikes;
  likes.innerHTML = LC._count;
}

export { filterMedias, getCurrentFilter, useFilter };
