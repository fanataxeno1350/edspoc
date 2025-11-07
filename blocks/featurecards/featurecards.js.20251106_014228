export default function decorate(b) {
  b.classList.add('featurecards-wrapper');
  const text = b.querySelector('.featurecards-text');
  if (text) text.classList.add('featurecards-block-title');
  const cards = b.querySelectorAll('.featurecards-section.featurecards-card');
  cards.forEach((card) => {
    card.classList.add('featurecards-rendered-card');
    const link = card.querySelector('.featurecards-link');
    if (link) link.classList.add('featurecards-link-active');
    const img = card.querySelector('.featurecards-image img');
    if (img) img.classList.add('featurecards-img');
    const title = card.querySelector('.featurecards-title-h2');
    if (title) title.classList.add('featurecards-card-title');
    const desc = card.querySelector('.featurecards-desc');
    if (desc) desc.classList.add('featurecards-card-desc');
    const btn = card.querySelector('.featurecards-arrow-icon-btn');
    if (btn) btn.classList.add('featurecards-card-btn');
  });
  const bolteSitareCards = b.querySelectorAll('.featurecards-bolte-sitare-card-section');
  bolteSitareCards.forEach((bsCard) => {
    bsCard.classList.add('featurecards-alt-card');
    const wrapper = bsCard.querySelector('.featurecards-bolte-sitare-card-section--wrapper');
    if (wrapper) wrapper.classList.add('featurecards-alt-card-wrapper');
    const img = bsCard.querySelector('.featurecards-bolte-sitare-card-section--img img');
    if (img) img.classList.add('featurecards-alt-img');
    const title = bsCard.querySelector('.featurecards-bolte-sitare-card-section--title');
    if (title) title.classList.add('featurecards-alt-title');
    const desc = bsCard.querySelector('.featurecards-bolte-sitare-card-section--text');
    if (desc) desc.classList.add('featurecards-alt-desc');
    const btn = bsCard.querySelector('.featurecards-bolte-sitare-card-section--btn');
    if (btn) btn.classList.add('featurecards-alt-btn');
  });
  const curve = b.querySelector('.featurecards-curve-container');
  if (curve) curve.classList.add('featurecards-block-curve');
}