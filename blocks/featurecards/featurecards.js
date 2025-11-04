export default function decorate(block) {
  // Title section
  const wrapper = block.closest('.featurecards-wrapper');
  if (!wrapper) return;
  const textSection = wrapper.querySelector('.featurecards-text');
  if (textSection) block.append(textSection.cloneNode(true));

  // Standard feature cards
  const cards = wrapper.querySelectorAll('.featurecards-section.featurecards-card');
  if (cards.length) {
    const cardList = document.createElement('div');
    cards.forEach((card) => {
      cardList.append(card.cloneNode(true));
    });
    block.append(cardList);
  }

  // BolteSitare card sections
  const bolteSitareCards = wrapper.querySelectorAll('.featurecards-bolte-sitare-card-section');
  if (bolteSitareCards.length) {
    const bolteList = document.createElement('div');
    bolteSitareCards.forEach((bCard) => {
      bolteList.append(bCard.cloneNode(true));
    });
    block.append(bolteList);
  }

  // Curve container
  const curve = wrapper.querySelector('.featurecards-curve-container');
  if (curve) block.append(curve.cloneNode(true));
}