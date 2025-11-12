export default function decorate(b){
  b.classList.add('featureCards-block');
  const mainTitle = b.querySelector('.featureCards-title');
  if(mainTitle) mainTitle.classList.add('featureCards-main-title');
  const cardSections = b.querySelectorAll('.featureCards-section');
  cardSections.forEach(section => {
    section.classList.add('featureCards-card-section');
    const link = section.querySelector('.featureCards-link');
    if(link) link.classList.add('featureCards-card-link');
    const img = section.querySelector('.featureCards-image');
    if(img) img.classList.add('featureCards-card-img');
    const title = section.querySelector('.featureCards-item-title');
    if(title) title.classList.add('featureCards-card-title');
    const desc = section.querySelector('.featureCards-description');
    if(desc) desc.classList.add('featureCards-card-desc');
    const btn = section.querySelector('.featureCards-arrow-icon-button');
    if(btn) btn.classList.add('featureCards-card-btn');
  });
  const altCards = b.querySelectorAll('.featureCards-bolte-sitare-card-section');
  altCards.forEach(card => {
    card.classList.add('featureCards-mobile-card-section');
    const img = card.querySelector('.featureCards-card-image');
    if(img) img.classList.add('featureCards-mobile-card-img');
    const title = card.querySelector('.featureCards-bolte-sitare-title');
    if(title) title.classList.add('featureCards-mobile-card-title');
    const desc = card.querySelector('.featureCards-bolte-sitare-text');
    if(desc) desc.classList.add('featureCards-mobile-card-desc');
    const btn = card.querySelector('.featureCards-bolte-sitare-button');
    if(btn) btn.classList.add('featureCards-mobile-card-btn');
  });
  const curve = b.querySelector('.featureCards-curve-container');
  if(curve) curve.classList.add('featureCards-block-curve');
}