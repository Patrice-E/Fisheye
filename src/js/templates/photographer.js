function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  function getUserCardDOM() {
    return `
      <article>
        <a href="photographer.html?id=${id}" ariaLabel="${name}">
          <img src="./src/assets/photographers/${portrait}" alt="${name}" class="photographer-portrait" />
          <h2>${name}</h2>
        </a>
        <h3>${city} ${country}</h3>
        <p>${tagline}</p>
        <p class="price">${price}€/jour</p>
      </article>
    `;
  }
  return { getUserCardDOM };
}

function photographerHeader(photographer) {
  const { name, city, country, tagline, price, portrait } = photographer;
  const tjm = document.querySelector('.tjm');
  tjm.textContent = `${price}€/jour`;

  return `
    <header>
      <h1 class="photographer-name">${name}</h1>
      <h2 class="photographer-location">${city} ${country}</h2>
      <p class="photographer-tag">${tagline}</p>
    </header>
    <button class="contact_button btn-hover" onclick="displayModal()">Contactez-moi</button>
    <img src="./src/assets/photographers/${portrait}" alt="${name}" class="photographer-portrait" />
  `;
}

export { photographerHeader, photographerTemplate };
