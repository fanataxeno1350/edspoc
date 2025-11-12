export default function decorate(b){
  b.classList.add('featureCards-block');
  const container = b.querySelector('.featureCards-container');
  if(container) container.classList.add('featureCards-block-container');
  const title = b.querySelector('.featureCards-title');
  if(title) title.classList.add('featureCards-block-title');
  b.querySelectorAll('.featureCards-section').forEach(section => {
    section.classList.add('featureCards-block-section');
    const link = section.querySelector('.featureCards-link');
    if(link) link.classList.add('featureCards-block-link');
    const image = section.querySelector('.featureCards-image');
    if(image) image.classList.add('featureCards-block-image');
    const itemTitle = section.querySelector('.featureCards-item-title');
    if(itemTitle) itemTitle.classList.add('featureCards-block-item-title');
    const desc = section.querySelector('.featureCards-description');
    if(desc) desc.classList.add('featureCards-block-description');
    const btn = section.querySelector('.featureCards-arrow-icon-button');
    if(btn) btn.classList.add('featureCards-block-cta');
  });
  b.querySelectorAll('.featureCards-bolte-sitare-card-section').forEach(card => {
    card.classList.add('featureCards-block-mobile-card');
    const img = card.querySelector('.featureCards-card-image');
    if(img) img.classList.add('featureCards-block-mobile-image');
    const title = card.querySelector('.featureCards-bolte-sitare-title');
    if(title) title.classList.add('featureCards-block-mobile-title');
    const text = card.querySelector('.featureCards-bolte-sitare-text');
    if(text) text.classList.add('featureCards-block-mobile-description');
    const btn = card.querySelector('.featureCards-bolte-sitare-button');
    if(btn) btn.classList.add('featureCards-block-mobile-cta');
  });
  const curve = b.querySelector('.featureCards-curve-container');
  if(curve) curve.classList.add('featureCards-block-curve');
}