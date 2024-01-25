// const noModal = document.querySelector('.no-modal');
const lightbox = document.querySelector('.lightbox');

function openLightBox(media, medias, namePhotographer) {
  let mediasID = [];
  for (let i = 0; i < medias.length; i++) {
    mediasID.push(medias[i].id);
  }
  let currentIndex = mediasID.indexOf(media.id);

  function displayCurrentMedia(index) {
    const currentMedia = medias[index];
    let mediaContent;
    const srcMedia = `./src/assets/photographers/${namePhotographer}`;
    if (currentMedia.image) {
      mediaContent = document.createElement('img');
      mediaContent.setAttribute('src', `${srcMedia}/${currentMedia.image}`);
    }
    if (currentMedia.video) {
      mediaContent = document.createElement('video');
      mediaContent.setAttribute('src', `${srcMedia}/${currentMedia.video}`);
      mediaContent.setAttribute('controls', '');
    }
    mediaContent.setAttribute('alt', currentMedia.title);
    const fig = document.querySelector('.lightbox__media figure');
    fig.innerHTML = '';
    fig.appendChild(mediaContent);
    const figcaption = document.createElement('figcaption');
    const mediaTitle = document.createElement('span');
    mediaTitle.innerHTML = currentMedia.title;
    figcaption.appendChild(mediaTitle);
    fig.appendChild(figcaption);
  }

  function displayPrevNextMedia(newIndex) {
    currentIndex += newIndex;
    if (currentIndex < 0) {
      currentIndex = medias.length - 1;
    }
    if (currentIndex > medias.length - 1) {
      currentIndex = 0;
    }
    displayCurrentMedia(currentIndex);
  }

  function handleKey(e) {
    const keyCode = e.key;
    switch (keyCode) {
      // case 'Tab':
      case 'ArrowRight':
      case 'ArrowDown':
        displayPrevNextMedia(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        displayPrevNextMedia(-1);
        break;
      case 'Escape':
        closeLightBox();
        break;
    }
  }

  function listenToHandleKey() {
    document.addEventListener('keydown', handleKey);
  }

  const leftArrow = document.querySelector('.left__arrow');
  leftArrow.addEventListener('click', function () {
    displayPrevNextMedia(-1);
  });
  const rightArrow = document.querySelector('.right__arrow');
  rightArrow.addEventListener('click', function () {
    displayPrevNextMedia(1);
  });

  displayCurrentMedia(currentIndex);

  noModal.setAttribute('aria-hidden', 'true');
  noModal.style.opacity = 0;
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.style.display = 'grid';

  listenToHandleKey();
}

function closeLightBox() {
  noModal.setAttribute('aria-hidden', 'false');
  noModal.style.opacity = 1;
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.style.display = 'none';
  removeAllListeners();
}
