import { photographerHeader } from '../templates/photographer.js';
import { useFetch } from '../utils/useFetch.js';
import {
  filterMedias,
  getCurrentFilter,
  useFilter,
} from '../utils/useFilter.js';

// Extraction de l'id du photographe
const params = new URLSearchParams(document.location.search);
const idPhotographer = parseInt(params.get('id'));

// Préparation du bouton des filtres
const toggleDisplayList = () => {
  const filterShowlist = document.querySelector('#filter_showlist');
  filterShowlist.classList.toggle('hidden');
};
const btnNoChange = document.querySelectorAll('.filter-nochange');
btnNoChange.forEach((btn) => btn.addEventListener('click', toggleDisplayList));

async function init() {
  // Destructuration des datas contenues dans le fichier json
  const { photographers, media } = await useFetch(
    './src/data/photographers.json'
  );
  // Sélection du photographe selon l'extraction de son id
  const photographer = photographers.find((p) => p.id === idPhotographer);
  const photographerName = photographer.name;
  // Sélection des médias du photographe
  const photographerMedias = media.filter(
    (m) => m.photographerId === idPhotographer
  );
  // Mise à jour de la modale de contact pour ajouter le nom du photographe
  const modalTitle = document.querySelector('#modalTitle');
  modalTitle.innerHTML = `Contactez-moi<br>${photographerName}`;

  // Affichage des informations principales
  const header = document.querySelector('.photograph-header');
  header.innerHTML = photographerHeader(photographer);

  // Filtrage des médias
  useFilter(photographerName, photographerMedias);

  // Affichage des médias
  const filter = getCurrentFilter();
  filterMedias(photographerName, photographerMedias, filter);
}

init();
