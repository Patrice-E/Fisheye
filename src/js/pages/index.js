import { photographerTemplate } from '../templates/photographer.js';
import { useFetch } from '../utils/useFetch.js';

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');
  photographersSection.innerHTML = '';

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.innerHTML += userCardDOM;
  });
}

async function init() {
  // Récupère uniquement les datas des photographes
  const { photographers } = await useFetch('./src/data/photographers.json');
  displayData(photographers);
}

init();
