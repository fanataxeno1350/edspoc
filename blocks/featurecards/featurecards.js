export default function decorate(block) {
  // Title Section
  const wrapper = block.closest('.featurecards-wrapper');
  const titleDiv = wrapper.querySelector('.featurecards-text');
  if (titleDiv) {
    block.append(titleDiv.cloneNode(true));
  }

  // Feature Cards
  const cardSections = wrapper.querySelectorAll('.featurecards-section.featurecards-card');
  const cardsContainer = document.createElement('div');
  cardSections.forEach((section) => {
    const card = document.createElement('div');
    card.className = section.className;
    const link = section.querySelector('a');
    if (link) {
      card.append(link.cloneNode(true));
    }
    cardsContainer.append(card);
  });
  block.append(cardsContainer);

  // Bolte Sitare Card Sections
  const bolteSitareCards = wrapper.querySelectorAll('.featurecards-bolte-sitare-card-section');
  bolteSitareCards.forEach((bolteCard) => {
    block.append(bolteCard.cloneNode(true));
  });

  // Curve Container
  const curve = wrapper.querySelector('.featurecards-curve-container');
  if (curve) {
    block.append(curve.cloneNode(true));
  }
}